export async function validateCPF(cpf: string) {

    const cleanCPF = cpf.replace(/\D/g, '');

    if (cleanCPF.length !== 11) {
      return false;
    }
    if (/^(\d)\1{10}$/.test(cleanCPF)) {
      return false;
    }
  

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    const firstDigit = (sum * 10) % 11;
  

    if (firstDigit !== parseInt(cleanCPF.charAt(9))) {
      return false;
    }
  

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    const secondDigit = (sum * 10) % 11;
  
    if (secondDigit !== parseInt(cleanCPF.charAt(10))) {
      return false;
    }
  
    return true;
  }
  