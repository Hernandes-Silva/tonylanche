import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Props = {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
};

const DateInput: React.FC<Props> = ({ value, onChange, label }) => {
  const [showPicker, setShowPicker] = useState(false);
  console.log(value)
  const handleChange = (_event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false);
    console.log("data picker", selectedDate)
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.dateText}>
          {format(value, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </Text>
        <Ionicons name="calendar-outline" size={22} color="#777" />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default DateInput
const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#444',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#222',
  },
});
