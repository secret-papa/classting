class CustomDate {
  static getCurrentTimeYYYYMMDDHHMM(date) {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const day = `${date.getDate()}`.padStart(2, 0);
    const hours = `${date.getHours()}`.padStart(2, 0);
    const minutes = `${date.getMinutes()}`.padStart(2, 0);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}


export default CustomDate;