// import { useState } from "react";

// function App() {
//   const [toDo, setToDo] = useState("");
//   const [toDos, setToDos] = useState([]);

//   const onChange = (event) => {
//     setToDo(event.target.value);
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();
//     if (toDo === "") {
//       return;
//     }
//     setToDo("");
//     //함수를 보내는 경우
//     setToDos((currentArray) => [toDo, ...currentArray]);
//   };

//   return (
//     <div>
//       <h1>My To Dos ({toDos.length})</h1>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           value={toDo}
//           type="text"
//           placeholder="write tour to do..."
//         />
//         <button>Add To Do</button>
//       </form>
//       <hr />
//       <ul>
//         {toDos.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  const [coins, setCoins] = useState([]);
  const [myMoney, setMymoney] = useState(0);
  const [myCoinPrice, setMyCoinPrice] = useState(0);

  const onChange = (event) => {
    setMymoney(event.target.value);
  };

  const onSelect = (event) => {
    setMyCoinPrice(event.target.value);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>coins {loading ? "" : `({coins.length})`}</h1>
      {loading ? (
        <strong>Loading</strong>
      ) : (
        <div>
          <input
            valuse={myMoney}
            onChange={onChange}
            type="number"
            placeholder="price!"
          />
          <div>

          <select onChange={onSelect}>
            {/* <option value={0}>select coin</option> */}
            {coins.map((coin) => (
              <option value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          </div>
         
          <input value={myMoney/myCoinPrice} type="number" disabled={true} />
        </div>
      )}
    </div>
  );
}

export default App;
