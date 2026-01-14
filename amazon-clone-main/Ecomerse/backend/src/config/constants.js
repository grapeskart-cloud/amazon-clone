module.exports = {
  // Pricing constants
  CURRENCY: {
    SYMBOL: "₹",
    NAME: "Indian Rupee",
    CODE: "INR",
    LOCALE: "en-IN",
  },

  TAX_RATES: {
    GST: 18,
    SGST: 9,
    CGST: 9,
  },

  // Vendor types
  VENDOR_TYPES: {
    INDIVIDUAL: "individual",
    COMPANY: "company",
    STARTUP: "startup",
    ENTERPRISE: "enterprise",
  },

  // Plan categories
  PLAN_CATEGORIES: {
    STARTER: "starter",
    GROWTH: "growth",
    ENTERPRISE: "enterprise",
    CUSTOM: "custom",
  },

  // Automation status
  AUTOMATION_STATUS: {
    ACTIVE: "active",
    PAUSED: "paused",
    DISABLED: "disabled",
  },

  // Market conditions
  MARKET_CONDITIONS: {
    DEMAND_LEVELS: [
      { value: "low", label: "Low Demand", multiplier: 0.9 },
      { value: "normal", label: "Normal", multiplier: 1.0 },
      { value: "high", label: "High Demand", multiplier: 1.1 },
    ],
    SEASONS: [
      { value: "regular", label: "Regular Season", multiplier: 1.0 },
      { value: "holiday", label: "Holiday Season", multiplier: 1.15 },
      { value: "off-peak", label: "Off-Peak Season", multiplier: 0.85 },
    ],
  },

  // Subscription status
  SUBSCRIPTION_STATUS: {
    ACTIVE: "active",
    INACTIVE: "inactive",
    TRIAL: "trial",
    CANCELLED: "cancelled",
    EXPIRED: "expired",
  },

  // Coupon types
  COUPON_TYPES: {
    PERCENTAGE: "percentage",
    FIXED_AMOUNT: "fixed_amount",
    FREE_TRIAL: "free_trial",
  },

  // Notification types
  NOTIFICATION_TYPES: {
    PRICE_CHANGE: "price_change",
    AUTOMATION_UPDATE: "automation_update",
    COUPON_APPLIED: "coupon_applied",
    SUBSCRIPTION_RENEWAL: "subscription_renewal",
    SHARE_ALERT: "share_alert",
  },

  // Rate limits
  RATE_LIMITS: {
    API: 100,
    AUTH: 10,
    SHARE: 20,
  },

  // Cache TTL (in seconds)
  CACHE_TTL: {
    PRICING: 300,
    ANALYTICS: 600,
    VENDOR_DATA: 1800,
  },
};
