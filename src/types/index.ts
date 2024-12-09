// src/types/index.ts

export interface Vehicle {
  brand: string;
  model: string;
  licensePlate: string;
  insuranceCompany: string;
  insuranceNumber: string;
  owner: {
    firstName: string;
    lastName: string;
    address: string;
    licenseNumber: string;
  };
}

export interface Accident {
  date: string;
  time: string;
  location: string;
  circumstances: number[];
  damages: string;
  sketch: string;
}

export interface Constat {
  id: string;
  vehicleA: Vehicle;
  vehicleB: Vehicle | null;
  accident: Accident;
  status: 'draft' | 'pending' | 'completed';
  initiator: string;
  created: string;
  modified: string;
}