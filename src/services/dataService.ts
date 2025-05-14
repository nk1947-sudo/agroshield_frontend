import { fetchDashboardData, createInspectionTask } from './apiService';

// Function to get dashboard data with additional processing if needed
export const getProcessedDashboardData = async () => {
  try {
    const data = await fetchDashboardData();

    // You can add any data transformation here if needed
    const processedData = {
      totalInspections: data.totalInspections,
      totalViolations: data.totalViolations,
      totalSeizures: data.totalSeizures,
      totalFIRs: data.totalFIRs,
    };

    return processedData;
  } catch (error) {
    console.error('Error processing dashboard data:', error);
    throw new Error('Error processing dashboard data');
  }
};

// Function to handle creating an inspection task with additional logic
export const handleCreateInspectionTask = async (taskData: object) => {
  try {
    // Here you can perform additional checks or transformations on taskData if needed
    const createdTask = await createInspectionTask(taskData);

    return createdTask;
  } catch (error) {
    console.error('Error creating inspection task:', error);
    throw new Error('Error creating inspection task');
  }
};

export default {
  getProcessedDashboardData,
  handleCreateInspectionTask,
};
