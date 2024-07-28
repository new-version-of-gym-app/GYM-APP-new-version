// import React, { useState } from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// const SCHEDULES = [
//   {
//     date: '2024-07-24',
//     slots: [
//       { time: '07:00', coach: 'Ahmed', course: 'Morning Yoga' },
//     ],
//   },

// ];

// const CalendarComponent = () => {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const onDayPress = (day) => {
//     setSelectedDate(day.dateString);
//   };

//   const renderSchedule = () => {
//     const schedule = SCHEDULES.find((s) => s.date === selectedDate);

//     if (!schedule) {
//       return <Text style={styles.noSchedule}>No schedule for this date.</Text>;
//     }

//     return (
//       <FlatList
//         data={schedule.slots}
//         keyExtractor={(item) => item.time}
//         renderItem={({ item }) => (
//           <View style={styles.scheduleItem}>
//             <Text style={styles.scheduleTime}>{item.time}</Text>
//             <Text style={styles.scheduleDetails}>{item.coach} - {item.course}</Text>
//           </View>
//         )}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Calendar
//         onDayPress={onDayPress}
//         markedDates={{ [selectedDate]: { selected: true, selectedColor: 'blue' } }}
//       />
//       {selectedDate && (
//         <View style={styles.scheduleContainer}>
//           <Text style={styles.scheduleHeader}>Schedule for {selectedDate}</Text>
//           {renderSchedule()}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: 'white',
//   },
//   scheduleContainer: {
//     marginTop: 20,
//     padding: 16,
//     backgroundColor: '#1c1c1c',
//     borderRadius: 8,
//   },
//   scheduleHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FFD700',
//     marginBottom: 10,
//   },
//   noSchedule: {
//     fontSize: 16,
//     color: '#FF6347',
//     textAlign: 'center',
//   },
//   scheduleItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//   },
//   scheduleTime: {
//     fontSize: 16,
//     color: '#00FFFF',
//   },
//   scheduleDetails: {
//     fontSize: 16,
//     color: '#ADFF2F',
//   },
// });

// export default CalendarComponent;
