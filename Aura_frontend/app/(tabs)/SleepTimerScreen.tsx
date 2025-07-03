// src/screens/SleepTimerScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSleep } from '../../context/SleepContext';
import dayjs from 'dayjs';

const SleepTimerScreen = ({ navigation }: any) => {
  const { addSleepRecord } = useSleep();
  const [bedtime, setBedtime] = useState<Date | null>(null);
  const [wakeTime, setWakeTime] = useState<Date | null>(null);
  const [picker, setPicker] = useState<'bed' | 'wake' | null>(null);

  const calculateHours = () => {
    if (!bedtime || !wakeTime) return 0;
    const diff = dayjs(wakeTime).diff(dayjs(bedtime), 'hour', true);
    return diff < 0 ? 24 + diff : diff;
  };

  const handleSave = () => {
    if (!bedtime || !wakeTime) return;

    addSleepRecord({
      date: dayjs().format('YYYY-MM-DD'),
      startTime: dayjs(bedtime).format('hh:mm A'),
      endTime: dayjs(wakeTime).format('hh:mm A'),
      duration: calculateHours(),
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Timer</Text>

      <Button title="Select Bedtime" onPress={() => setPicker('bed')} />
      <Text>{bedtime ? dayjs(bedtime).format('hh:mm A') : 'Not set'}</Text>

      <Button title="Select Wake Time" onPress={() => setPicker('wake')} />
      <Text>{wakeTime ? dayjs(wakeTime).format('hh:mm A') : 'Not set'}</Text>

      <Text style={styles.sleepHours}>Total Sleep: {calculateHours().toFixed(1)} hrs</Text>
      <Button title="Save Sleep Time" onPress={handleSave} />

      <DateTimePickerModal
        isVisible={picker !== null}
        mode="time"
        date={new Date()}
        onConfirm={(date) => {
          picker === 'bed' ? setBedtime(date) : setWakeTime(date);
          setPicker(null);
        }}
        onCancel={() => setPicker(null)}
      />
    </View>
  );
};

export default SleepTimerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  sleepHours: { marginVertical: 20, fontSize: 18 },
});
