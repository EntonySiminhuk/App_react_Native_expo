import { ActivityIndicator } from "react-native"

export function Loading(){ //não esta sendo usado o default pq quero usar a importação nomeada
    return ( <ActivityIndicator className="flex-1 bg-green-500 items-center justify-center text-orange-500"/>
    )
}