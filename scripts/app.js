const person1 = {
    name: 'Edwin',
    lastname: 'Rozo',
    age: 37,
    hobbies: ['Futbol','Billar']
  }
  
  // const person2 = ['Edwin','Rozo', 37]
  // console.log(person2)
  
  
  // // Destructuring
  // const { name, lastname } = person1
  
  // const [value1, value3] = person2
  
  // const fichaAdso = [
  //   { name: 'Eusebio', rol: 'Backend' },
  //   { name: 'Sofia', rol: 'Backend' },
  //   { name: 'Andres', rol: 'Backend' },
  //   { name: 'Andrea', rol: 'Backend' }  
  // ]
  
  // const names = fichaAdso.filter(item => item.name.charAt(0) === 'A')
  // console.log(names)
  
  console.log(Object.keys(person1))
  console.log(Object.values(person1))
  console.log(Object.entries(person1))
  
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element = object[key];
      
    }
  }
  
  for (const element of object) {
    
  }
  
  