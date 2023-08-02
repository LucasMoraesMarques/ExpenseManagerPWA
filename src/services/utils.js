function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export const stringAvatar = (name) => {
  let firstName = name.split(" ")[0];
  let lastName = name.split(" ")[1];
  return {
    sx: {
      bgcolor: stringToColor(name),
      fontSize: "17px",
    },
    children:
      firstName && lastName ? `${firstName[0]}${lastName[0]}` : firstName[0],
  };
};

export const validateTextField = (value, required = false) => {
  if (required && !value) {
    return false;
  }
  return true;
};

export const validateCurrency = (value) => {
  let regex = /^([1-9]\d{0,2}(\.\d{3})*|\d+)(\,\d{1,2})?$/;
  return regex.test(value);
};

export const moneyMask = (value) => {
  value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

  const options = { minimumFractionDigits: 2 }
  const result = new Intl.NumberFormat('pt-BR', options).format(
    parseFloat(value) / 100
  )

  console.log(result)

  return result
}

export const calculateTotalValueOfArray = (array) => {
  let sum = 0
  for(let value of array){
    value = parseFloat(value.replace(".", "").replace(",", "."))
    sum += value
  }
  return sum
}

export const validateEmail = (email) => {
  let emailRegex =
      /^([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+$/;
  return emailRegex.test(email)
}


export const dateInRange = (date, start=new Date(), end=new Date()) =>{
  console.log('d s e')
  console.log(date, start, end)
  console.log( (date >= start) && (date <= end))
  return (date >= start) && (date <= end)
}