export const upFirstChar = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getAge = (dobString) => {
    const today = new Date();
    const birtDate = new Date(dobString);
    let age = today.getFullYear() - birtDate.getFullYear();
    const month = today.getMonth() - birtDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birtDate.getDate())) {
        age--;
    }
    return age;
};
