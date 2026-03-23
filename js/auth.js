// Authentication utilities for The ROSE Network

/**
 * Register a new user with email, password, and metadata.
 * The database trigger auto-creates a profile row with pending status.
 */
async function registerUser(email, password, fullName, role) {
  var result = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: fullName,
        role: role
      }
    }
  });
  return result;
}

/**
 * Sign in with email and password.
 */
async function loginUser(email, password) {
  var result = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });
  return result;
}

/**
 * Sign out the current user.
 */
async function logoutUser() {
  var result = await supabase.auth.signOut();
  return result;
}

/**
 * Get the current session (null if not logged in).
 */
async function getSession() {
  var result = await supabase.auth.getSession();
  return result.data.session;
}

/**
 * Get the current user's profile from the profiles table.
 */
async function getProfile() {
  var session = await getSession();
  if (!session) return null;

  var result = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  return result.data;
}

/**
 * Check if current user is approved.
 */
async function isApproved() {
  var profile = await getProfile();
  return profile && profile.approval_status === 'approved';
}

/**
 * Check if current user is an admin.
 */
async function isAdmin() {
  var profile = await getProfile();
  return profile && profile.role === 'admin';
}

/**
 * Require authentication — redirect to login if not signed in.
 * Returns the session if authenticated.
 */
async function requireAuth() {
  var session = await getSession();
  if (!session) {
    window.location.href = '/login';
    return null;
  }
  return session;
}

/**
 * Require approved status — redirect to pending page if not approved.
 * Returns the profile if approved.
 */
async function requireApproval() {
  var session = await requireAuth();
  if (!session) return null;

  var profile = await getProfile();
  if (!profile || profile.approval_status !== 'approved') {
    window.location.href = '/pending';
    return null;
  }
  return profile;
}

/**
 * Require admin role — redirect to dashboard if not admin.
 * Returns the profile if admin.
 */
async function requireAdmin() {
  var profile = await requireApproval();
  if (!profile) return null;

  if (profile.role !== 'admin') {
    window.location.href = '/dashboard';
    return null;
  }
  return profile;
}

/**
 * Get all pending registrations (admin only).
 */
async function getPendingUsers() {
  var result = await supabase
    .from('profiles')
    .select('*')
    .eq('approval_status', 'pending')
    .order('created_at', { ascending: true });

  return result.data || [];
}

/**
 * Get all users (admin only).
 */
async function getAllUsers() {
  var result = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  return result.data || [];
}

/**
 * Approve a user (admin only).
 */
async function approveUser(userId) {
  var session = await getSession();
  var result = await supabase
    .from('profiles')
    .update({
      approval_status: 'approved',
      approved_by: session.user.id,
      approved_at: new Date().toISOString()
    })
    .eq('id', userId);

  return result;
}

/**
 * Reject a user (admin only).
 */
async function rejectUser(userId) {
  var result = await supabase
    .from('profiles')
    .update({ approval_status: 'rejected' })
    .eq('id', userId);

  return result;
}

/**
 * Update the navigation based on auth state.
 * Call this on every page load.
 */
async function updateNavForAuth() {
  var session = await getSession();
  var authLinks = document.querySelector('.nav-auth-links');
  if (!authLinks) return;

  if (session) {
    var profile = await getProfile();
    var dashLink = profile && profile.role === 'admin' ? '/admin' : '/dashboard';
    authLinks.innerHTML =
      '<li><a href="' + dashLink + '" class="nav-cta nav-cta--auth">My Account</a></li>' +
      '<li><a href="#" id="nav-logout" class="nav-link--auth">Logout</a></li>';

    var logoutBtn = document.getElementById('nav-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        await logoutUser();
        window.location.href = '/';
      });
    }
  } else {
    authLinks.innerHTML =
      '<li><a href="/login" class="nav-link--auth">Login</a></li>' +
      '<li><a href="/register" class="nav-cta nav-cta--auth">Register</a></li>';
  }
}

/**
 * Format role for display.
 */
function formatRole(role) {
  var roles = {
    service_leaver: 'Service Leaver',
    veteran: 'Veteran',
    networker: 'Networker',
    employer: 'Employer',
    admin: 'Admin'
  };
  return roles[role] || role;
}

/**
 * Format approval status for display.
 */
function formatStatus(status) {
  var statuses = {
    pending: 'Pending Approval',
    approved: 'Approved',
    rejected: 'Rejected'
  };
  return statuses[status] || status;
}
