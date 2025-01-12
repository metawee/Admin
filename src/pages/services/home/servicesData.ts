interface IServicesData {
  Name: string;
  Price: string;
}

const ServicesData: IServicesData[] = [
  {
    Name: 'Haircut',
    Price: '200 EGP'
  },
  {
    Name: 'Hair Coloring',
    Price: '140 EGP'
  },
  {
    Name: 'Styling',
    Price: '220 EGP'
  },
  {
    Name: 'Manicure',
    Price: '100 EGP'
  }
];

export { ServicesData, type IServicesData };
