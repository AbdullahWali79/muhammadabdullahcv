import { createClient } from '@supabase/supabase-js'

// Supabase project details
const supabaseUrl = 'https://zvzvxvxutzapbuxaoemr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2enZ4dnh1dHphcGJ1eGFvZW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyOTc4ODksImV4cCI6MjA3Njg3Mzg4OX0.1AYyMvWjOWaICE47GIJViCPh6OJSehnbOQOCUpreCoY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database table names
export const TABLES = {
  USER_DATA: 'user_data',
  HOME_DATA: 'home_data',
  ABOUT_DATA: 'about_data',
  SERVICE_DATA: 'service_data',
  PORTFOLIO_DATA: 'portfolio_data',
  NEWS_DATA: 'news_data',
  CONTACT_DATA: 'contact_data'
}
