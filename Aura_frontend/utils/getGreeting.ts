//constants/getGreeting.ts

export const getGreeting = (date: Date = new Date()): string => {
    const hour = date.getHours();

    if(hour >=5 && hour < 12){
        return "Good Morning";
    }
    else if(hour >= 12 && hour < 17){
        return "Good Afternoon";
    }
    else if(hour >= 17 && hour < 21){
        return "Good Evening";
    }
    else{
        return "Good to see you Again";
    }
}
