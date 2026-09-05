/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';

// SANDBOX Supabase project — an isolated TEST database created specifically
// for previewing this AI-Studio-designed frontend. It is completely
// separate from the production Jumia SKU Creator database
// (vxscfljgtmddnmzmwitq) — nothing written here ever touches production
// data, and nothing here is read by the live site.
//
// If this design is approved to replace the live site, these two
// constants are the only things that need to change to point at
// production instead.
const SANDBOX_URL = 'https://lgoeyrhgepmhgomkiyrl.supabase.co';
const SANDBOX_KEY = 'sb_publishable_8oPLZVTKnzh3YNe8sDRfRA_dPFHhoZx';

export const sb = createClient(SANDBOX_URL, SANDBOX_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});
