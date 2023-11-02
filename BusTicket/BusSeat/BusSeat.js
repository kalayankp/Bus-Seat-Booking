import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  ToastAndroid,
} from 'react-native';

const TicketBookingScreen = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatDetails, setSeatDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const seatTypes = {
    inner: {
      label: 'Inner Berth',
      price: 50,
    },
    outer: {
      label: 'Outer Berth',
      price: 40,
    },
  };

  const seatNumbers = {
    inner: [
      'A1', 'A2', 'A3', 'A4',
      'B1','B2'
     
      
  
      
    ],
    outer: [
      'E1', 'E2', 'E3', 'E4',
      
   
    
     
    ],
  };

  const selectSeat = (seatNumber, seatType) => {
    if (selectedSeats.includes(seatNumber)) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      const removedSeatIndex = seatDetails.findIndex((seat) => seat.number === seatNumber);
      if (removedSeatIndex !== -1) {
        const seatPrice = seatTypes[seatType].price;
        const updatedPrice = totalPrice - seatPrice;
        setTotalPrice(updatedPrice);
        setSeatDetails([
          ...seatDetails.slice(0, removedSeatIndex),
          ...seatDetails.slice(removedSeatIndex + 1),
        ]);
      }
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, seatNumber]);
      const seatPrice = seatTypes[seatType].price;
      const updatedPrice = totalPrice + seatPrice;
      setTotalPrice(updatedPrice);
      const newSeatDetails = {
        number: seatNumber,
        type: seatType,
      };
      setSeatDetails([...seatDetails, newSeatDetails]);
      // Show price near the seat using a platform-specific method (Toast)
      if (Platform.OS === 'android') {
        ToastAndroid.show(`Price: $${seatPrice}`, ToastAndroid.LONG);
      }
    }
  };

  const renderSeats = (seatType) => {
    const seatComponents = seatNumbers[seatType].map((seatNumber) => {
      const isSelected = selectedSeats.includes(seatNumber);

      return (
        <TouchableOpacity
          key={seatNumber}
          style={[
            styles.seat,
            { backgroundColor: isSelected ? 'green' : 'gray' },
          ]}
          onPress={() => selectSeat(seatNumber, seatType)}
        >
          <Text>{seatNumber}</Text>
          {isSelected && (
            <View style={styles.seatOptions}>
              <Text> Available</Text>
              <Text> Males only</Text>
              <Text> Females</Text>
              <Text> Reserved</Text>
              <Text> Open</Text>
              <Text> Booking</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    });

    return seatComponents;
  };

  return (
    <ScrollView>
      <View>
        <Text>Selected Seats: {selectedSeats.join(', ')}</Text>
        <ScrollView horizontal>
          <View style={styles.seatContainer}>
            <View style={styles.seatType}>
              <Text>Inner Berth</Text>
              {renderSeats('inner')}
            </View>
            <View style={styles.seatType}>
              <Text>Outer Berth</Text>
              {renderSeats('outer')}
            </View>
          </View>
        </ScrollView>
        <View style={styles.priceDetails}>
          <Text>Seat Details:</Text>
          {seatDetails.map((seat, index) => (
            <Text key={index}>{`Seat ${seat.number} - ${seatTypes[seat.type].label}`}</Text>
          ))}
          <Text>Total Price: ${totalPrice}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  seat: {
    padding: 10,
    margin: 10,
    borderWidth: 3,
    borderColor: 'black',
  },
  seatContainer: {
    flexDirection: 'row',
  },
  seatType: {
    flex: 1,
    
  },
  seatOptions: {
    backgroundColor: 'white',
    padding: 10,
  },
  priceDetails: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 10,
  },
});

export default TicketBookingScreen;
