import { supabase, TABLES } from '../config/supabase'

// User Data (CV Form)
export const saveUserData = async (userData) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.USER_DATA)
      .upsert([userData], { onConflict: 'id' })
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error saving user data:', error)
    return { success: false, error: error.message }
  }
}

export const getUserData = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.USER_DATA)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return { success: true, data: data || null }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return { success: false, error: error.message }
  }
}

// Home Data
export const saveHomeData = async (homeData) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.HOME_DATA)
      .upsert([{ id: 1, ...homeData }], { onConflict: 'id' })
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error saving home data:', error)
    return { success: false, error: error.message }
  }
}

export const getHomeData = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.HOME_DATA)
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return { success: true, data: data || null }
  } catch (error) {
    console.error('Error fetching home data:', error)
    return { success: false, error: error.message }
  }
}

// About Data
export const saveAboutData = async (aboutData) => {
  try {
    console.log('Saving about data:', aboutData);
    const dataToSave = { id: 1, ...aboutData };
    console.log('Data to save:', dataToSave);
    
    const { data, error } = await supabase
      .from(TABLES.ABOUT_DATA)
      .upsert([dataToSave], { onConflict: 'id' })
    
    if (error) {
      console.error('Supabase error saving about data:', error);
      throw error;
    }
    
    console.log('About data saved successfully:', data);
    return { success: true, data }
  } catch (error) {
    console.error('Error saving about data:', error)
    return { success: false, error: error.message }
  }
}

export const getAboutData = async () => {
  try {
    console.log('Fetching about data from table:', TABLES.ABOUT_DATA);
    const { data, error } = await supabase
      .from(TABLES.ABOUT_DATA)
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error) {
      // PGRST116 means no rows found, which is okay
      if (error.code === 'PGRST116') {
        console.log('No about data found in database (this is okay for first time)');
        return { success: true, data: null }
      }
      throw error
    }
    
    console.log('About data fetched successfully:', data);
    return { success: true, data: data || null }
  } catch (error) {
    console.error('Error fetching about data:', error)
    return { success: false, error: error.message }
  }
}

// Service Data
export const saveServiceData = async (serviceData) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.SERVICE_DATA)
      .upsert([{ id: 1, ...serviceData }], { onConflict: 'id' })
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error saving service data:', error)
    return { success: false, error: error.message }
  }
}

export const getServiceData = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.SERVICE_DATA)
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return { success: true, data: data || null }
  } catch (error) {
    console.error('Error fetching service data:', error)
    return { success: false, error: error.message }
  }
}

// Portfolio Data
export const savePortfolioData = async (portfolioData) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.PORTFOLIO_DATA)
      .upsert([{ id: 1, ...portfolioData }], { onConflict: 'id' })
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error saving portfolio data:', error)
    return { success: false, error: error.message }
  }
}

export const getPortfolioData = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.PORTFOLIO_DATA)
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return { success: true, data: data || null }
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    return { success: false, error: error.message }
  }
}

// News Data
export const saveNewsData = async (newsData) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.NEWS_DATA)
      .upsert([{ id: 1, ...newsData }], { onConflict: 'id' })
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error saving news data:', error)
    return { success: false, error: error.message }
  }
}

export const getNewsData = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.NEWS_DATA)
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return { success: true, data: data || null }
  } catch (error) {
    console.error('Error fetching news data:', error)
    return { success: false, error: error.message }
  }
}

// Contact Data
export const saveContactData = async (contactData) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.CONTACT_DATA)
      .upsert([{ id: 1, ...contactData }], { onConflict: 'id' })
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error saving contact data:', error)
    return { success: false, error: error.message }
  }
}

export const getContactData = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.CONTACT_DATA)
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return { success: true, data: data || null }
  } catch (error) {
    console.error('Error fetching contact data:', error)
    return { success: false, error: error.message }
  }
}
