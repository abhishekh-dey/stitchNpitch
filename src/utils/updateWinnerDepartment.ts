import { supabase } from '../lib/supabase';

export const updateWinnerDepartment = async () => {
  try {
    // Update any winners with department "sales" to "Sales" (proper case)
    const { data, error } = await supabase
      .from('winners')
      .update({ department: 'Sales' })
      .eq('department', 'sales')
      .select();

    if (error) {
      console.error('Error updating winner department:', error);
      return false;
    }

    console.log('Updated winners:', data);
    return true;
  } catch (error) {
    console.error('Error connecting to database:', error);
    return false;
  }
};

// Also update any other potential case mismatches
export const normalizeAllDepartments = async () => {
  try {
    const updates = [
      { from: 'sales', to: 'Sales' },
      { from: 'hosting', to: 'Hosting' },
      { from: 'general', to: 'General' },
      { from: 'billing', to: 'Billing' },
      { from: 'productivity', to: 'Productivity' }
    ];

    for (const update of updates) {
      const { error } = await supabase
        .from('winners')
        .update({ department: update.to })
        .eq('department', update.from);

      if (error) {
        console.error(`Error updating ${update.from} to ${update.to}:`, error);
      }
    }

    return true;
  } catch (error) {
    console.error('Error normalizing departments:', error);
    return false;
  }
};