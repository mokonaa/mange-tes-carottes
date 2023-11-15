import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://bglogpmsyufyoptglcyv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnbG9ncG1zeXVmeW9wdGdsY3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4MDk1ODQsImV4cCI6MjAxMzM4NTU4NH0.ekbaZzh4W3-VOjT-H1cQD1tpHBviM1YWemF3cVZKgr4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})

export default supabase;