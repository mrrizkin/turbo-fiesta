import duosexadecimal from "./duosexadecimal";
import {
  axis,
  indosat,
  smartfren,
  telkomsel,
  three3,
  xlAxiata,
} from "./provider";

export default function shortenPhoneNumber(phoneNumber: string) {
  let phoneNumberArr = phoneNumber.split("");
  const prefix = phoneNumberArr.splice(0, 4).join("");
  const provider = checkProvider(prefix);
  const shorted = shorter(phoneNumberArr.join(""));
  return Object.freeze({
    prefix,
    provider,
    shorted,
    source: phoneNumber,
  });
}

function checkProvider(prefix: string): string {
  if (telkomsel.includes(prefix)) return "Telkomsel";
  if (xlAxiata.includes(prefix)) return "XL Axiata";
  if (three3.includes(prefix)) return "Three (3)";
  if (indosat.includes(prefix)) return "Indosat";
  if (axis.includes(prefix)) return "Axis";
  if (smartfren.includes(prefix)) return "Smartfren";
  return "Tidak diketahui";
}

function shorter(nomorStr: string): string {
  let num = parseInt(nomorStr);
  const hasil = [];
  while (num > 0) {
    hasil.push(duosexadecimal[num % 62]);
    num = Math.floor(num / 62);
  }
  return hasil.reverse().join("");
}
