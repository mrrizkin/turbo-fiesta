import { Component, createSignal } from "solid-js";
import shortenPhoneNumber from "./shortener";

const App: Component = () => {
  const [nomorHp, setNomorHp] = createSignal("");
  const [hasil, setHasil] = createSignal({
    provider: "Masukin dulu nomornya",
    nomor: "Masukin dulu nomornya",
  });

  function updateNomorHp(e: Event) {
    const { value } = e.target as HTMLInputElement;
    setNomorHp(value);
  }

  function updateHasil() {
    let nomor = normalisasiNomorHP(nomorHp());
    if (/^08[1-9][0-9]{7,10}$/.test(nomor)) {
      const { provider, prefix, shorted } = shortenPhoneNumber(nomor);
      setHasil({ provider, nomor: prefix + "-" + shorted });
    }
  }

  function normalisasiNomorHP(nomor: string) {
    let phone = nomor.trim();
    if (phone.startsWith("+62")) {
      phone = "0" + phone.slice(3);
    } else if (phone.startsWith("62")) {
      phone = "0" + phone.slice(2);
    } else if (phone.startsWith("8")) {
      phone = "0" + phone;
    }
    return phone.replace(/[- .]/g, "");
  }

  return (
    <div class="flex flex-col justify-center items-center">
      <p class="text-4xl font-bold text-center py-20">Masukan nomor kamu</p>
      <div>
        <p>
          <b>Provider</b>: <span>{hasil().provider}</span>
        </p>
        <p>
          <b>Nomor Kamu</b>: <span>{hasil().nomor}</span>
        </p>
      </div>
      <input
        value={nomorHp()}
        onChange={updateNomorHp}
        class="border border-black p-2 rounded outline-none my-4"
      />
      <button class="px-4 py-2 bg-emerald-500 rounded" onClick={updateHasil}>
        Persingkat
      </button>
    </div>
  );
};

export default App;
