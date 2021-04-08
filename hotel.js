class Hotel {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = Number(capacity);
        this.bookings = [];
        this.currentBookingNumber = 1;
        this._single = this.capacity / 2;
        this._double = Math.trunc(this.capacity * 0.3);
        this._maisonette = Math.trunc(this.capacity * 0.2);
    }

    get roomsPricing() {
        return {
            single: 50,
            double: 90,
            maisonette: 135
        }
    }


    rentARoom(clientName, roomType, nights) {
        nights = Number(nights);
        if (roomType === 'single') {
            if (this._single === 0) {
                if (this._double === 0 && this._maisonette === 0) {
                    return `No ${roomType} rooms available!`;
                } else if (this._double === 0) {
                    return `No ${roomType} rooms available! Available maisonette rooms: ${this._maisonette}.`;
                } else if (this._maisonette === 0) {
                    return `No ${roomType} rooms available! Available double rooms: ${this._double}.`;
                } else {
                    return `No ${roomType} rooms available! Available double rooms: ${this._double}. Available maisonette rooms: ${this._maisonette}.`;
                }
            } else {
                let booking = this.currentBookingNumber;
                this.currentBookingNumber++;
                this._single--;
                this.bookings.push({ clientName, roomType, nights, rentNumber: booking });
                return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${booking}.`;
            }
        } else if (roomType === 'double') {
            if (this._double === 0) {
                if (this._single === 0 && this._maisonette === 0) {
                    return `No ${roomType} rooms available!`;
                } else if (this._single === 0) {
                    return `No ${roomType} rooms available! Available maisonette rooms: ${this._maisonette}.`;
                } else if (this._maisonette === 0) {
                    return `No ${roomType} rooms available! Available single rooms: ${this._single}.`;
                } else {
                    return `No ${roomType} rooms available! Available single rooms: ${this._single}. Available maisonette rooms: ${this._maisonette}.`;
                }
            } else {
                let booking = this.currentBookingNumber;
                this.currentBookingNumber++;
                this._double--;
                this.bookings.push({ clientName, roomType, nights, rentNumber: booking });
                return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${booking}.`;
            }
        } else if (roomType === 'maisonette') {
            if (this._maisonette === 0) {
                if (this._single === 0 && this._double === 0) {
                    return `No ${roomType} rooms available!`;
                } else if (this._single === 0) {
                    return `No ${roomType} rooms available! Available double rooms: ${this._double}.`;
                } else if (this._double === 0) {
                    return `No ${roomType} rooms available! Available single rooms: ${this._single}.`;
                } else {
                    return `No ${roomType} rooms available! Available single rooms: ${this._single}. Available double rooms: ${this._double}.`;
                }
            } else {
                let booking = this.currentBookingNumber;
                this.currentBookingNumber++;
                this._maisonette--;
                this.bookings.push({ clientName, roomType, nights, rentNumber: booking });
                return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${booking}.`;
            }

        }
    }

    checkOut(currentBookingNumber) {
        let booking, index;
        currentBookingNumber = Number(currentBookingNumber);

        booking = this.bookings.find(b => b.rentNumber === currentBookingNumber);
        index = this.bookings.indexOf(booking);
        if (booking) {

            let totalPrice = 0;
            if (booking.roomType === 'single') {
                this._single++;
                totalPrice = booking.nights * this.roomsPricing[booking.roomType];
                this.bookings.splice(index, 1);
                return `We hope you enjoyed your time here, Mr./Mrs. ${booking.clientName}. The total amount of money you have to pay is ${totalPrice} BGN.`;
            } else if (booking.roomType === 'double') {
                this._double++;
                totalPrice = booking.nights * this.roomsPricing[booking.roomType];
                this.bookings.splice(index, 1);
                return `We hope you enjoyed your time here, Mr./Mrs. ${booking.clientName}. The total amount of money you have to pay is ${totalPrice} BGN.`;
            } else if (booking.roomType === 'maisonette') {
                this._maisonette++;
                totalPrice = booking.nights * this.roomsPricing[booking.roomType];
                this.bookings.splice(index, 1);
                return `We hope you enjoyed your time here, Mr./Mrs. ${booking.clientName}. The total amount of money you have to pay is ${totalPrice} BGN.`;
            }
        } else {
            return `The booking ${currentBookingNumber} is invalid.`
        }
    }

    report() {
        if (this.bookings.length === 0) {
            let toPrint = [];
            toPrint.push(`${this.name.toUpperCase()} DATABASE:`);
            toPrint.push('--------------------');
            toPrint.push('There are currently no bookings.');
            return toPrint.join('\n');
        } else {
            let toPrint = [];
            toPrint.push(`${this.name.toUpperCase()} DATABASE:`);
            toPrint.push('--------------------');
            this.bookings.forEach((b, i) => {
                toPrint.push(`bookingNumber - ${b.rentNumber}`);
                toPrint.push(`clientName - ${b.clientName}`);
                toPrint.push(`roomType - ${b.roomType}`);
                toPrint.push(`nights - ${b.nights}`);

                if (this.bookings.length - 1 !== i) {
                    toPrint.push('----------');

                }

            })

            return toPrint.join('\n');
        }
    }

}

let hotel = new Hotel('HotUni', 10);

hotel.rentARoom('Peter', 'single', 4);
hotel.rentARoom('Robert', 'double', 4);
hotel.rentARoom('Geroge', 'maisonette', 6);
hotel.checkOut(1);

console.log(hotel.report());


