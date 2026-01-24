import http from './httpBase';

// ghlService.ts
// Service to handle integrations with GoHighLevel via Webhooks

// -----------------------------------------------------------------------------
// CONFIGURATION
// -----------------------------------------------------------------------------
// ⚠️ CLIENT: Replace this URL with your actual GHL Workflow Webhook URL
// Ideally, this should be in an environment variable like import.meta.env.VITE_GHL_WEBHOOK_URL
const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/4fhSCPC1a0OG97wPEGMj/webhook-trigger/c9db105b-14d7-4f57-9aca-914086f44ea4';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

export interface ContactPayload {
  firstName?: string;
  lastName?: string; // Optional if using fullName
  fullName?: string;
  email: string;
  phone: string;
  source: string; // 'website_catering', 'website_franchise', 'website_contact'
  tags?: string[];
  customFields?: Record<string, any>;
  message?: string;
}

// -----------------------------------------------------------------------------
// SERVICE
// -----------------------------------------------------------------------------

const ghlService = {
  /**
   * Helper to split full name into first and last name
   */
  splitName(fullName: string) {
    const parts = fullName ? fullName.trim().split(' ') : [];
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || ''; // Handle middle names or single names
    return { firstName, lastName };
  },

  /**
   * Generic method to send data to the GHL Webhook
   */
  async sendToWebhook(payload: Record<string, any>): Promise<void> {
    try {
      const response = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`GHL Webhook Error: ${response.statusText}`);
      }

      // Success
      return;
    } catch (error) {
      console.error('Error sending to GHL:', error);
      throw error;
    }
  },

  /**
   * Submits Catering Form Data
   */
  async submitCatering(formData: any) {
    const payload = {
      ...formData,
      // Standard GHL fields mapping
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      company_name: formData.company,

      // Metadata
      source: 'website_catering_form',
      tags: ['website-lead', 'catering-inquiry'],
      submission_time: new Date().toISOString(),

      // Flatten custom fields for easier mapping in GHL
      event_date: formData.eventDate,
      event_time_start: formData.startTime,
      event_time_end: formData.endTime,
      guest_count: formData.guestCount,
      event_nature: formData.eventNature,
      event_style: formData.eventStyle,
      event_address: `${formData.streetAddress || ''}, ${formData.city || ''}, ${formData.state || ''} ${formData.zipCode || ''}`,
      instructions: formData.deliveryInstructions,
      special_requests: formData.additionalInfo
    };

    return this.sendToWebhook(payload);
  },

  /**
   * Submits Franchise Form Data
   */
  async submitFranchise(formData: any) {
    const { firstName, lastName } = this.splitName(formData.fullName);

    const payload = {
      first_name: firstName,
      last_name: lastName,
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,

      source: 'website_franchise_form',
      tags: ['website-lead', 'franchise-inquiry'],
      submission_time: new Date().toISOString()
    };

    return this.sendToWebhook(payload);
  },

  /**
   * Submits General Contact Form Data
   */
  async submitContact(formData: any) {
    const { firstName, lastName } = this.splitName(formData.name);

    const payload = {
      first_name: firstName,
      last_name: lastName,
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,

      source: 'website_contact_form',
      tags: ['website-lead', 'general-inquiry'],
      submission_time: new Date().toISOString()
    };

    return this.sendToWebhook(payload);
  }
};

export default ghlService;
