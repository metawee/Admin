interface IReservationData {
  reservations: {
    name: string;
    branch: string;
  };
  Service: string;
  Date: string;
  Time: string;
  Status: string;
  Notes: string;
}

const ReservationData: IReservationData[] = [
  {
    reservations: {
      name: 'Ahmed Mohamed',
      branch: 'Main branch'
    },
    Service: 'Haircut',
    Date: '2023-06-15',
    Time: '14:00',
    Status: 'Confirmed',
    Notes: 'Prefers classic style'
  },
  {
    reservations: {
      name: 'Fatima Ali',
      branch: 'Main branch'
    },
    Service: 'Hair dye',
    Date: '2023-06-15',
    Time: '15:30',
    Status: 'Pending',
    Notes: 'Allergic to certain dyes'
  },
  {
    reservations: {
      name: 'Mahmoud Khaled',
      branch: 'Main branch'
    },
    Service: 'Hair styling',
    Date: '2023-06-16',
    Time: '10:00',
    Status: 'Confirmed',
    Notes: ''
  },
  {
    reservations: {
      name: 'Sara Ahmed',
      branch: 'Main branch'
    },
    Service: 'Nail care',
    Date: '2023-06-16',
    Time: '11:30',
    Status: 'Cancelled',
    Notes: 'Cancelled due to illness'
  }
];

export { ReservationData, type IReservationData };
