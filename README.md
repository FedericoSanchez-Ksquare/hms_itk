# hms_itk

# MODELS

### User Models

User model is necessary to define the properties of all general user
that will use the system

```ts
interface User {
  userId: int;
  name: string; //varchar 100
  lastName: string; //varchar 100
  password: string; //varchar 100
  email: string; // varchar 100
}
```

### Patient Models

Added a Patient Model that will esxted properties from User, this will help define a patient in more specified way

```ts
interface Patient extends User {
  patientId: int;
  birth: string; // date 100
  age: number; //int 100
  weigth: number; //int 100
  height: number; // int 100
  gender: string; // varchar 100
  address: string; // varchar 200
}
```

### Doctor Model

Doctor model will be useful in defining the existing doctors of the system
and for creating and showing their upcoming appointments, this Doctor interface extends from User tto get some properties

```ts
interface Doctor extends User {
  doctorId: int;
  medicalSpeciality: string; // varchar 200
}
```

### Appointment Model

This Model exists to keep track on all the things that can be part of an appointment, this will be useful for both the Patient and Doctor given that both are linked by their respective appointments

```ts
interface Appointments {
  appointmentId: int;
  appointmentDate: string; // date 100
  appointmentDetails: string; // varchar 300
  appointedDoctor: string; // varchar 100
  appointedPatient: string; // varchar 100
}
```

### Admin Model

This Model exists just to define a User as an admin if necessary for greater control of the system

```ts
//this could also be a boolean property from user that if true has the admin privilieges or false making him a normal user in terms of permissions as in either doctor or patient, but big question mark as if this is good or not
// on the meanwhile, Admin will be a really simple interface
interface Admin extends User {
  adminId: int;
}
```
