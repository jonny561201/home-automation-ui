export const hasHvacTasks = (state) =>
    state.tasks.some(task => task.taskType === 'hvac');

export const selectPreferredGarage = (state) => {
    const preferences = state.preferences || {};
    return state.garageDoors.find(door => door.nodeId === preferences.garageNodeId) || null;
};
