interface ICustomerManagementData {
  Name: string;
  Email: string;
  Phone: string;
  LastVisit: string;
  TotalVisits: string;
}

const CustomerManagementData: ICustomerManagementData[] = [
  {
    Name: 'Ahmed Mohamed',
    Email: 'ahmed@example.com',
    Phone: '+1234567890',
    LastVisit: '2023-06-10',
    TotalVisits: '5',
  },
  {
    Name: 'Jane Smith',
    Email: 'ahmed@example.com',
    Phone: '+1987654321',
    LastVisit: '2023-06-12',
    TotalVisits: '3',
  },
  {
    Name: 'Mike Johnson',
    Email: 'ahmed@example.com',
    Phone: '+1122334455',
    LastVisit: '2023-06-15',
    TotalVisits: '1',
  }
];

export { CustomerManagementData, type ICustomerManagementData };
