import { Text, View, Image, Button } from "react-native";
import { useState } from "react";

export default function BadgerBakedGood(props) {
    const [orders, setOrders] = useState(props.numOrders);
    
    return <View style={{height : 450, width : 350, backgroundColor : 'lightgray', borderRadius : 25}}>
        <Text style={{fontSize : 30, textAlign : 'center', fontWeight : 'bold', textTransform : 'capitalize'}}>{props.name}</Text>
        <Image style={{height : 250, width : 250, borderWidth : 5, borderColor : 'gray', alignSelf : 'center'}} 
            source = {{uri : props.imgSrc}}/>
        <Text style={{fontSize : 25, textAlign : 'center', fontWeight : 'bold'}}>${props.price}</Text>
        <Text style={{fontSize : 18, textAlign : 'center'}}>
            {(props.upperLimit == -1)? "You may order as many as you like!" : "You may order up to " + props.upperLimit + "!"}
        </Text>
        <Text>{"\n"}</Text>
        <View style={{flexDirection : "row", justifyContent : "center"}}>
            <Button title="-" disabled={orders===0} onPress={()=>{
                props.changeCart(orders - 1);
                setOrders(orders => orders - 1);
                }}/>
            <Text>        {orders}        </Text>
            <Button title="+" disabled={orders===props.upperLimit} onPress={()=>{
                props.changeCart(orders + 1);
                setOrders(orders => orders + 1);
                }}/>
            </View>
    </View>
}
