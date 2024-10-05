import { shiba_inu } from "../generated/shiba-inu";
import { Account, Token } from "../generated/schema";
import { BigDecimal, ethereum, Address } from "@graphprotocol/graph-ts";


export function HandleFetchAccount(address: string): Account  {
    let account = Account.load(address);

    if(!account) {
        account = new Account(address);
        account.save();
    }
    return account;
}

export function HandleFetchBalance(
    tokenAddress: Address,
    accountAddress: Address
): BigDecimal {
    let shiba_inu_token = shiba_inu.bind(tokenAddress);
    let amount = BigDecimal.fromString("0");

    let tokenBalance = shiba_inu.try_balanceOf(accountAddress);
    if(!tokenBalance.reverted) {
        amount = tokenBalance.value.toBigDecimal();
    }
    
    return amount;
}