import axios from "axios";

export default async function getIPv4() {
    const { data } = await axios.get("https://api.ipify.org");
    return data;
};

export async function getIPv6() {
    const { data } = await axios.get("https://api6.ipify.org");
    return data;
};