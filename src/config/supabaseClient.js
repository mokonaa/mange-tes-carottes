import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// Better put your these secret keys in .env file
export const supabase = createClient("https://bglogpmsyufyoptglcyv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnbG9ncG1zeXVmeW9wdGdsY3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4MDk1ODQsImV4cCI6MjAxMzM4NTU4NH0.ekbaZzh4W3-VOjT-H1cQD1tpHBviM1YWemF3cVZKgr4", {
    localStorage: AsyncStorage,
    detectSessionInUrl: false // Prevents Supabase from evaluating window.location.href, breaking mobile
});


export default supabase;