import {ThemedText} from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function Bookings() {

    return <ParallaxScrollView
        headerImage={<></>} headerBackgroundColor={{
        dark: "",
        light: ""
    }} headerHeight={0}>
        <ThemedText>Bookings</ThemedText>
    </ParallaxScrollView>
}