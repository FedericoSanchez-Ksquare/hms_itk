# hms_itk

# MODELS

### User Models

User model is necessary to define the properties of all general user
that will use the system and will define its role in the system as in patient, doctor or admin

```ts
interface User {
  userId: int;
  firstName: string; //varchar 100
  lastName: string; //varchar 100
  password: string; //varchar 100
  email: string; // varchar 100
  roleId: int;
}
```

### Role Models

With this Role Model we will asign an specific role any user created being either a patient, a doctor or an admin

```ts
interface Role {
  roleId: int;
  role: string; //varchar(100)
}
```

### Patient Models

Added a Patient Model that will extend properties from User, this will help define a patient in more specific way

```ts
interface Patient extends User {
  patientId: int;
  birth: string; // date 100
  weigth: number; //int 100
  height: number; // int 100
  gender: enum; // varchar 100
  address: string; // varchar 200
}
```

### Doctor Model

Doctor model will be useful in defining the existing doctors of the system
and for creating and showing their upcoming appointments, this Doctor interface extends from User tto get some properties

```ts
interface Doctor extends User {
  doctorId: int;
  medicalSpeciality: enum; // varchar 200
}
```

### Appointment Model

This Model exists to keep track on all the things that can be part of an appointment, this will be useful for both the Patient and Doctor given that both are linked by their respective appointments

```ts
interface Appointments {
  appointmentId: int;
  appointmentDate: string; // date 100
  appointmentDetails: string; // varchar 300
  doctorId: int;
  patientId: int;
}
```

### Admin Model

This Model exists just to define a User as an admin if necessary for greater control of the system

```ts
interface Admin extends User {
  adminId: int;
}
```
