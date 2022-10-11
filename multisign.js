import { XrplClient } from "xrpl-client";
import { derive, sign } from "xrpl-accountlib";
import { flagNames } from "flagnames";

const client = new XrplClient("wss://s.altnet.rippletest.net:51233");
const secret = "ss1cgv9n1gYqP655cFTr5VTuMmYqQ";
const master = derive.familySeed(secret);

/// xrpl-js

//1st signer address : secret1 : snsG42KfNhcL1G55oV5T4LMD7vDpJ (activated account on ledger) //rNuYnBXtLu8vwbg5SDEk5puX289rYPJy9w
const secret1 = "snsG42KfNhcL1G55oV5T4LMD7vDpJ";
const account1 = derive.familySeed(secret1);

//2nd signer address : secret2 : sn3wBdKWdDFje3xugNegUsTcz9beM (activated account on ledger) //rfUR3NbuF8vcmJpLpGA71Nt4FV1hzsELeH
const secret2 = "sn3wBdKWdDFje3xugNegUsTcz9beM";
const account2 = derive.familySeed(secret2);

//3rd signer address : secret3 : shS5arVJhdEByZyCysYWqUtfTG7Mp : mathematical address(not activated account on ledger) //rnKnDx3PFAh9PJPwAoudCX2S91suoBYVLw
const secret3 = "shS5arVJhdEByZyCysYWqUtfTG7Mp";
const account3 = derive.familySeed(secret3);

//destination : secret : shb1a7wdnsXcHYV7JTsbnbWFH4AEX
const destination = "rUUuUyqK3CUR6coYLm8tjghBrrWe98YuZt";

//regular key : secret : ssxYuAjyAuv5aWHEh6if3NqwBDhDh
const regularKeySecret = "ssxYuAjyAuv5aWHEh6if3NqwBDhDh";
const regularKeyAddress = derive.familySeed(regularKeySecret);

const main = async () => {
  const account_data = await client.send({
    command: "account_objects", //once we create signer list, command: account_objects, account_objects array will get filled. initially its empty array
    //   account: master.address, //once we create signer list, command: account_info, OwnerCount will increment by 1. initially its 0
    account: master.address,
  });

  console.log("ssss", account1);
  //console.log("dcdcdcdc", JSON.stringify(account_data, null, "\t"));
  //console.log("ss", account_objects.account_objects[0].LedgerEntryType);
  //console.log("flags", account_objects.account_objects[0].Flags);

  //console.log("account_data", account_data);

  // console.log(
  //   "flags",
  //   flagNames(
  //     account_objects.account_objects[0].LedgerEntryType,
  //     account_objects.account_objects[0].Flags
  //   )
  // );
  //   console.log("master.address", master.address);

  //setting signer list

  //   const payload = {
  //     TransactionType: "SignerListSet",
  //     Account: master.address,
  //     Fee: "10", // always get the fee information from ledger directly
  //     Sequence: account_data.account_data.Sequence,
  //     SignerQuorum: 3,
  //     SignerEntries: [
  //       {
  //         SignerEntry: {
  //           Account: account1,
  //           SignerWeight: 2,
  //         },
  //       },
  //       {
  //         SignerEntry: {
  //           Account: account2,
  //           SignerWeight: 1,
  //         },
  //       },
  //       {
  //         SignerEntry: {
  //           Account: account3,
  //           SignerWeight: 1,
  //         },
  //       },
  //     ],
  //   };

  //   const { signedTransaction } = sign(payload, master);
  //   const result = await client.send({
  //     command: "submit",
  //     tx_blob: signedTransaction,
  //   });
  //   console.log("result", result);

  //disabling master
  // const asfDisableMaster = 4;

  // const payload = {
  //   TransactionType: "AccountSet",
  //   Account: master.address,
  //   Fee: "10",
  //   Sequence: account_data.account_data.Sequence,
  //   SetFlag: asfDisableMaster,
  // };

  // set regular key

  // const payload = {
  //   TransactionType: "SetRegularKey",
  //   Account: master.address,
  //   Fee: "0",
  //   RegularKey: regularKeyAddress.address,
  //   Sequence: account_data.account_data.Sequence,
  // };

  // const { signedTransaction } = sign(payload, [account1, account2, account3]);

  // const result = await client.send({
  //   command: "submit",
  //   tx_blob: signedTransaction,
  // });

  // console.log("result", result);

  // multi signed payment transaction

  // const payload = {
  //   TransactionType: "Payment",
  //   Account: master.address,
  //   Destination: destination,
  //   Amount: "1000000", //1XRP
  //   Fee: String((2 + 1) * 20),
  //   Sequence: account_data.account_data.Sequence,
  // };

  // const { signedTransaction } = sign(payload, [account1, account2, account3]);
  // const result = await client.send({
  //   command: "submit",
  //   tx_blob: signedTransaction,
  // });

  // console.log("result", result);
};
main();
