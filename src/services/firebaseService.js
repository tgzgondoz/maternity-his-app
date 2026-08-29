import { 
  database, 
  ref, 
  push, 
  set, 
  onValue, 
  query, 
  orderByChild, 
  equalTo, 
  get, 
  update, 
  remove 
} from '../firebase/config';

// ==================== BIRTH RECORDS ====================

export const saveBirthRecord = async (birthData) => {
  try {
    const birthRef = ref(database, 'births');
    const newBirthRef = push(birthRef);
    const birthId = newBirthRef.key;
    
    const birthRecord = {
      id: birthId,
      ...birthData,
      babyName: birthData.babyName || 'Unnamed',
      sex: birthData.sex || 'Male',
      birthDateTime: birthData.birthDateTime || new Date().toISOString(),
      birthWeight: parseFloat(birthData.birthWeight) || 0,
      apgarScore: parseInt(birthData.apgarScore) || 0,
      motherName: birthData.motherName || '',
      motherId: birthData.motherId || '',
      deliveryType: birthData.deliveryType || 'Normal',
      facility: birthData.facility || '',
      attendingMidwife: birthData.attendingMidwife || '',
      babyStatus: birthData.babyStatus || 'Live birth',
      createdAt: new Date().toISOString(),
      syncedToHIS: true
    };
    
    await set(newBirthRef, birthRecord);
    return { success: true, id: birthId, data: birthRecord };
  } catch (error) {
    console.error('Error saving birth record:', error);
    return { success: false, error: error.message };
  }
};

export const subscribeToBirths = (callback) => {
  const birthsRef = ref(database, 'births');
  return onValue(birthsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const birthsArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      callback(birthsArray);
    } else {
      callback([]);
    }
  });
};

export const getBirthsByMother = async (motherId) => {
  try {
    const birthsRef = ref(database, 'births');
    const motherQuery = query(birthsRef, orderByChild('motherId'), equalTo(motherId));
    const snapshot = await get(motherQuery);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching births by mother:', error);
    return [];
  }
};

export const updateBirthRecord = async (id, updates) => {
  try {
    const birthRef = ref(database, `births/${id}`);
    await update(birthRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating birth record:', error);
    return { success: false, error: error.message };
  }
};

export const deleteBirthRecord = async (id) => {
  try {
    const birthRef = ref(database, `births/${id}`);
    await remove(birthRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting birth record:', error);
    return { success: false, error: error.message };
  }
};

// ==================== STATISTICS ====================

export const subscribeToStats = (callback) => {
  const birthsRef = ref(database, 'births');
  return onValue(birthsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const birthsArray = Object.keys(data).map(key => data[key]);
      
      const totalBirths = birthsArray.length;
      const today = new Date().toDateString();
      const todayBirths = birthsArray.filter(b => 
        b.birthDateTime && new Date(b.birthDateTime).toDateString() === today
      ).length;
      
      const normalDeliveries = birthsArray.filter(b => b.deliveryType === 'Normal').length;
      const cSections = birthsArray.filter(b => b.deliveryType === 'C-Section').length;
      const lowBirthWeight = birthsArray.filter(b => b.birthWeight < 2.5).length;
      const stillbirths = birthsArray.filter(b => b.babyStatus === 'Stillbirth').length;
      
      const stats = {
        totalBirths,
        todayBirths,
        normalDeliveries,
        cSections,
        lowBirthWeight,
        stillbirths,
        cSectionRate: totalBirths > 0 ? ((cSections / totalBirths) * 100).toFixed(1) : 0
      };
      
      callback(stats);
    } else {
      callback({
        totalBirths: 0,
        todayBirths: 0,
        normalDeliveries: 0,
        cSections: 0,
        lowBirthWeight: 0,
        stillbirths: 0,
        cSectionRate: 0
      });
    }
  });
};

// ==================== REPORTS ====================

export const getMonthlyReports = async () => {
  try {
    const birthsRef = ref(database, 'births');
    const snapshot = await get(birthsRef);
    
    if (!snapshot.exists()) return [];
    
    const data = snapshot.val();
    const birthsArray = Object.keys(data).map(key => data[key]);
    
    const monthlyData = {};
    birthsArray.forEach(birth => {
      if (birth.birthDateTime) {
        const date = new Date(birth.birthDateTime);
        const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        
        if (!monthlyData[monthYear]) {
          monthlyData[monthYear] = {
            month: monthYear,
            births: 0,
            cSections: 0,
            lowWeight: 0,
            stillbirths: 0
          };
        }
        
        monthlyData[monthYear].births++;
        if (birth.deliveryType === 'C-Section') monthlyData[monthYear].cSections++;
        if (birth.birthWeight < 2.5) monthlyData[monthYear].lowWeight++;
        if (birth.babyStatus === 'Stillbirth') monthlyData[monthYear].stillbirths++;
      }
    });
    
    return Object.values(monthlyData);
  } catch (error) {
    console.error('Error getting monthly reports:', error);
    return [];
  }
};