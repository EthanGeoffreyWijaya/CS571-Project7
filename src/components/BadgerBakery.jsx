import { Text, View, Button } from "react-native";
import BadgerBakedGood from "./BadgerBakedGood";
import CS571 from '@cs571/mobile-client';

import { useState, useEffect } from "react";

export default function BadgerBakery() {
    const [bakedGoods, setBakedGoods] = useState([]);
    const [keyList, setKeyList] = useState([]);
    const [item, setItem] = useState(0);
    
    const [orderAmounts, setOrderAmounts] = useState([0]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw7/goods", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            setBakedGoods(data);
            setKeyList(Object.keys(data));
            setOrderAmounts(new Array(Object.keys(data).length).fill(0));
        })
    }, []);

    const updateOrders = (value) => {
        temp = [...orderAmounts];
        temp[item] = value
        setOrderAmounts(temp);
    }

    useEffect(() => {
        orderTotal = 0;
        i = 0;
        keyList.forEach(good => orderTotal += bakedGoods[good].price * orderAmounts[i++])
        setTotal(orderTotal.toFixed(2))
    }, [orderAmounts]);

    return <View>
        <Text style={{fontSize : 25, textAlign : 'center'}}>Welcome to Badger Bakery!</Text>
        <Text></Text>
        <View style={{flexDirection : "row", justifyContent : "center"}}>
            <Button title="Previous" disabled={item===0} onPress={() => {setItem(item => item - 1)}}/>
            <Text>    </Text>
            <Button title="Next" disabled={item===keyList.length - 1} onPress={() => {setItem(item => item + 1)}}/>
        </View>
        <Text></Text>
        <BadgerBakedGood key={keyList[item]} numOrders={orderAmounts[item]} changeCart={updateOrders} {...bakedGoods[keyList[item]]}/>
        <Text style={{fontSize : 20, textAlign : 'center'}}>Order Total: ${total}</Text>
        <Button title="Place Order" disabled={orderAmounts.every(el => el == 0)} 
            onPress={()=>{
                alert("Order confirmed! Your order contains " + orderAmounts.reduce((a, b) => a+b, 0) 
                    + " items and costs $" + total + "!");
                setOrderAmounts(orderAmounts => [...orderAmounts].fill(0));
                setItem(0);
            }}/>
    </View> 
    
    
}
