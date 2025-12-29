// WarriorBabe Sales Momentum Documentation Data
// Complete and CORRECTED with proper names
// All HubSpot links included

const documentationData = {
  "workflows": [
    {
      "id": "wf-001",
      "name": "Setter Engine - Call Time Range Stamp Workflow",
      "status": "on",
      "objectType": "Call",
      "link": "https://app.hubspot.com/workflows/23635629/platform/flow/1748739678/edit",
      "description": "Uses Custom Code (Node.js 20.x) to calculate EST time bucket for every outbound call. Powers 'Best Time to Call' analytics.",
      "purpose": "Track which time windows yield optimal connect and conversion rates",
      "tags": [
        "workflow",
        "call",
        "analytics",
        "custom-code",
        "active"
      ]
    },
    {
      "id": "wf-002",
      "name": "Setter Engine - New Lead Delegation",
      "status": "on",
      "objectType": "Contact",
      "link": "https://app.hubspot.com/workflows/23635629/platform/flow/1747917832/edit",
      "description": "Round-robin delegation for VSL and Quiz leads. Rotates Contact Owner among Setter Team and sends notification.",
      "purpose": "Ensures balanced lead distribution and immediate setter awareness",
      "tags": [
        "workflow",
        "contact",
        "delegation",
        "active"
      ]
    },
    {
      "id": "wf-003",
      "name": "Universal Call Tracker",
      "status": "on",
      "objectType": "Contact",
      "link": "https://app.hubspot.com/workflows/23635629/platform/flow/1748363913/edit",
      "description": "Dialer-agnostic outbound call tracker. Works with Linq, Aloware, or HubSpot native. Prevents setter burnout by tracking call volume.",
      "purpose": "Universal tracking system for call volume and timing",
      "tags": [
        "workflow",
        "contact",
        "call-tracking",
        "active"
      ]
    },
    {
      "id": "wf-004",
      "name": "SM | Lifecycle - Lead Intake (Entry Points)",
      "status": "on",
      "objectType": "Contact",
      "link": "https://app.hubspot.com/workflows/23635629/platform/flow/1743063732/edit",
      "description": "Entry gate for all new leads. Triggers on opt-in forms (Opt In Form OR Lead Intake Form). Sets Lead lifecycle, stamps opt-in time, adds to ALL LEADS master list, routes to funnel-specific static lists (VSL/Quiz), then calls delegation workflow.",
      "purpose": "First touchpoint - establishes lead in system and routes to correct processing path",
      "tags": [
        "workflow",
        "contact",
        "entry-point",
        "lifecycle",
        "active"
      ]
    },
    {
      "id": "wf-005",
      "name": "SM | Global Meetings Tool Sync",
      "status": "on",
      "objectType": "Contact",
      "link": "https://app.hubspot.com/workflows/23635629/platform/flow/1747352986/edit",
      "description": "Attribution workflow - distinguishes Setter-Booked vs Self-Booked meetings. Reads 'Meeting Type of Last Booking' (populated by Zapier from Calendly event name). Sets correct Lifecycle (SQL for setter bookings, MQL for self-bookings) and creates Deal in Sales Momentum Pipeline.",
      "purpose": "Proper attribution between setter-generated SQLs and self-booked MQLs",
      "tags": [
        "workflow",
        "contact",
        "meeting-sync",
        "attribution",
        "active"
      ]
    },
    {
      "id": "wf-006",
      "name": "SM | Lifecycle - PQL Router (LT Purchase)",
      "status": "on",
      "objectType": "Low Ticket Purchase",
      "link": "https://app.hubspot.com/workflows/23635629/platform/flow/1744065923/edit",
      "description": "Triggers when Low Ticket Purchase enters 'Purchased' stage. 3-way branch based on pipeline stage (New/Purchased/Failed). Only 'Purchased' branch has actions: stamps Purchase Date on LT object, then sets Lifecycle = PQL on ALL associated contacts.",
      "purpose": "Manages PQL lifecycle progression for Low Ticket buyers",
      "tags": [
        "workflow",
        "object",
        "pql",
        "purchase",
        "active"
      ]
    },
    {
      "id": "wf-007",
      "name": "PQL Helper Workflow (Adding To List)",
      "status": "on",
      "objectType": "Contact",
      "link": "https://app.hubspot.com/workflows/23635629/platform/flow/1747852923/edit",
      "description": "Helper workflow to populate Master Static - Low Ticket (PQL) list. Triggers when contact is associated to a LT Purchase with stage = Purchased AND Purchase Date = Today.",
      "purpose": "Populates PQL static list for marketing emails and segmentation",
      "tags": [
        "workflow",
        "contact",
        "pql",
        "helper",
        "active"
      ]
    },
    {
      "id": "wf-008",
      "name": "SM Setter Engine | Lead Status Big Brain",
      "status": "on",
      "objectType": "Contact",
      "link": "https://app.hubspot.com/workflows/23635629/platform/flow/1745555346/edit",
      "description": "Central SM Lead Status automation hub. Triggers on any Lead Status change. 18-way branch based on new status value. Currently only Branch 5 ('In Progress') has action - sets Lifecycle = SQL. Framework for future status-triggered automations.",
      "purpose": "Orchestrates Contact-level automations based on Lead Status changes",
      "tags": [
        "workflow",
        "contact",
        "lead-status",
        "big-brain",
        "active"
      ]
    },
    {
      "id": "wf-009",
      "name": "SM | Lifecycle - MQL Router (Application)",
      "status": "on",
      "objectType": "Contact",
      "link": "https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit",
      "description": "Application form qualification router. Triggers on WarriorBabe Application submission. 5-way branch based on income investment question. Branch 1 (<$1k) \u2192 Unqualified. Branches 2-5 ($1k+) \u2192 MQL.",
      "purpose": "Automated marketing qualification based on application self-reported investment capacity",
      "tags": [
        "workflow",
        "contact",
        "mql",
        "application",
        "active"
      ]
    },
    {
      "id": "wf-010",
      "name": "SM | Deal Pipeline Automation (Big Brain)",
      "status": "on",
      "objectType": "Deal",
      "link": "https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit",
      "description": "Central Deal Pipeline automation hub. Triggers on any Deal Stage change in Sales Momentum Pipeline. 10-way branch by stage. Key actions: Branch 3 (Setter Qualified) \u2192 Sets SQL. Branch 4 (Closer Call Booked) \u2192 Sub-branch checks if Lifecycle \u2260 MQL, then sets SQL (preserves self-booked MQL attribution).",
      "purpose": "Orchestrates Deal-level automations and lifecycle updates based on pipeline movement",
      "tags": [
        "workflow",
        "deal",
        "pipeline",
        "big-brain",
        "active"
      ]
    },
    {
      "id": "wf-011",
      "name": "Lead Delegation, Assignment, & Speed To Lead Tracking",
      "status": "on",
      "objectType": "Contact",
      "link": "https://app.hubspot.com/workflows/23635629/platform/flow/1749323893/edit",
      "description": "New delegation system that triggers when leads are added to 'Setter Engine - Leads to Be Set' list. Sets marketing contact status, rotates to Setter Team, stamps Setter Owner, then calls Delegation Date/Time Stamp workflow.",
      "purpose": "Automated lead distribution triggered by list membership with marketing contact flagging",
      "tags": [
        "workflow",
        "contact",
        "delegation",
        "speed-to-lead",
        "new-system",
        "active"
      ]
    },
    {
      "id": "wf-012",
      "name": "Delegation Date/Time Stamp",
      "status": "on",
      "objectType": "Contact",
      "link": "https://app.hubspot.com/workflows/23635629/platform/flow/1749317019/edit",
      "description": "Called by Lead Delegation workflow. Stamps delegation timestamp and sends in-app notification to assigned setter. Only runs during business hours (Mon-Fri, 8am-6pm EST).",
      "purpose": "Records exact delegation time and notifies setter - operates within business hours only",
      "tags": [
        "workflow",
        "contact",
        "delegation",
        "timestamp",
        "active"
      ]
    },
    {
      "id": "wf-013",
      "name": "Speed To Lead - Datetime Time Stamp",
      "status": "on",
      "objectType": "Contact",
      "link": "https://app.hubspot.com/workflows/23635629/platform/flow/1749341048/edit",
      "description": "Triggers when setter makes their FIRST outbound call (Number of Outbound Calls = 1). Stamps the exact datetime of first touch for Speed to Lead calculation.",
      "purpose": "Locks in exact timestamp of first call attempt for Speed to Lead metrics",
      "tags": [
        "workflow",
        "contact",
        "speed-to-lead",
        "timestamp",
        "active"
      ]
    },
    {
      "id": "wf-014",
      "name": "Speed To Lead - First Touch Group Stamp",
      "status": "on",
      "objectType": "Contact",
      "link": "https://app.hubspot.com/workflows/23635629/platform/flow/1749341019/edit",
      "description": "Categorizes leads into 5 Speed to Lead time buckets with color-coded badges (Green <2hrs, Blue 2-24hrs, Yellow 24-48hrs, Orange 48-96hrs, Red 96hrs+).",
      "purpose": "Buckets Speed to Lead into reportable ranges with color-coded badges",
      "tags": [
        "workflow",
        "contact",
        "speed-to-lead",
        "reporting",
        "active"
      ]
    }
  ],
  "contactProperties": [
    {
      "id": "prop-001",
      "name": "SM Lead Status",
      "fieldType": "Dropdown",
      "group": "Sales Momentum",
      "purpose": "Core setter work queue status. Tracks prospecting progress independently of Lifecycle Stage.",
      "options": "New, Prospecting, In Progress, Bad Timing, No Progress, Meeting Booked, No Show/Cancel, Open Deal, Unqualified, Decaying, Red Zone, Closed Won, Closed Lost, Bad Data, Do Not Contact, Blacklisted Customer, Repeat Customer, Contact (Non-Lead)",
      "usedIn": "Every setter Smart View (P1-P5), Setter Engine | Lead Status Big Brain workflow, Bad Data suppression list, Setter delegation and rotation logic",
      "note": "Created as parallel property to avoid breaking 760k+ legacy contact records",
      "tags": [
        "property",
        "contact",
        "core",
        "setter-engine"
      ]
    },
    {
      "id": "prop-002",
      "name": "SM | Setter Owner",
      "fieldType": "User",
      "group": "SM Setter Engine",
      "purpose": "Attribution property - preserves setter credit even when Contact Owner changes to Closer",
      "stampedBy": "Setter Engine - New Lead Delegation workflow",
      "usedIn": "Setter Smart Views (filter by 'Me'), Commission tracking, Performance reporting",
      "tags": [
        "property",
        "contact",
        "attribution",
        "setter"
      ]
    },
    {
      "id": "prop-003",
      "name": "SM | Last Outbound Call Date",
      "fieldType": "Date and Time",
      "group": "SM Setter Engine",
      "purpose": "Timestamp of most recent outbound call. Powers P1 list exclusion logic.",
      "stampedBy": "Universal Call Tracker workflow",
      "usedIn": "P1 list filter: Exclude if called today, Call velocity reporting, Cadence compliance",
      "tags": [
        "property",
        "contact",
        "call-tracking",
        "timestamp"
      ]
    },
    {
      "id": "prop-004",
      "name": "SM | Number of Outbound Calls",
      "fieldType": "Number",
      "group": "SM Setter Engine",
      "purpose": "Running count of total outbound calls. Used for No Progress identification.",
      "stampedBy": "Universal Call Tracker workflow (incremented)",
      "usedIn": "No Progress trigger (>10 calls), Touch density reporting, Setter performance metrics",
      "tags": [
        "property",
        "contact",
        "call-tracking",
        "volume"
      ]
    },
    {
      "id": "prop-005",
      "name": "Meeting Type of Last Booking",
      "fieldType": "Single Line Text",
      "group": "SM Setter Engine",
      "purpose": "Calendly event name captured by Zapier. Distinguishes setter vs self bookings.",
      "populatedBy": "Zapier (Calendly \u2192 HubSpot)",
      "usedIn": "SM | Global Meetings Tool Sync workflow, SQL vs MQL determination, Attribution reporting",
      "values": "Setter: 'Body Transformation Assessment - WB' | Self: 'Body Transformation Assessment'",
      "tags": [
        "property",
        "contact",
        "meeting",
        "attribution"
      ]
    },
    {
      "id": "prop-006",
      "name": "Lead Delegated Date/Time Stamp",
      "fieldType": "Date and Time",
      "group": "SM Setter Engine",
      "purpose": "Timestamp when lead was assigned to current setter. Used for Speed-to-lead calculation.",
      "stampedBy": "Delegation Date/Time Stamp workflow",
      "usedIn": "Speed to Lead reporting, Lead age calculations, Delegation audit trail",
      "tags": [
        "property",
        "contact",
        "delegation",
        "timestamp"
      ]
    },
    {
      "id": "prop-007",
      "name": "Last Opt-in Time-Stamp",
      "fieldType": "Date and Time",
      "group": "SM Setter Engine",
      "purpose": "Timestamp of most recent form opt-in. Used for campaign-specific filtering.",
      "stampedBy": "SM | Lifecycle - Lead Intake workflow",
      "usedIn": "Campaign isolation filters, Lead freshness reporting, Re-engagement timing",
      "tags": [
        "property",
        "contact",
        "opt-in",
        "timestamp"
      ]
    },
    {
      "id": "prop-008",
      "name": "Funnel ID",
      "fieldType": "Single Line Text",
      "group": "Marketing Attribution",
      "purpose": "Tracks originating funnel. Hidden field on forms.",
      "examples": "VSL-Optin-Nikkiey-WB4, VSL-Quiz-Maggie-WB4, VSL-DTA-Nikkiey-Macro",
      "usedIn": "Lead Intake workflow branching logic, Master Static List routing, Attribution reporting",
      "tags": [
        "property",
        "contact",
        "attribution",
        "funnel"
      ]
    },
    {
      "id": "prop-009",
      "name": "On my journey to get healthy fit and toned I have already invested...",
      "fieldType": "Dropdown",
      "group": "Application Form",
      "purpose": "Qualification question on WarriorBabe Application. Income investment capacity.",
      "options": "Less than $1,000 | $1,000 to $5,000 | $5,000 to $10,000 | $10,000 to $20,000 | $20,000 or more",
      "usedIn": "SM | Lifecycle - MQL Router workflow, Active list filters (App + No Call, VSL Warm, Quiz Warm), Qualification logic (<$1k = DQ)",
      "tags": [
        "property",
        "contact",
        "application",
        "qualification"
      ]
    },
    {
      "id": "prop-010",
      "name": "Date of last meeting booked in meetings tool",
      "fieldType": "Date and Time",
      "group": "Meetings",
      "purpose": "HubSpot native property - last meeting booking timestamp.",
      "usedIn": "All gap list filters (App + No Call, VSL Warm, Quiz Warm), No-show identification, Booking velocity reporting",
      "tags": [
        "property",
        "contact",
        "meeting",
        "native"
      ]
    }
  ],
  "speedToLeadProperties": [
    {
      "id": "stl-prop-001",
      "name": "SM | First Outbound Call Date",
      "fieldType": "Date and Time Picker",
      "group": "Speed to Lead",
      "purpose": "Locks in the exact second the first call was made. Never changes after initial stamp.",
      "stampedBy": "Speed To Lead - Datetime Time Stamp workflow",
      "usedIn": "SM | Speed to Lead Calculation (as End Date), Speed to Lead reporting, First touch velocity metrics",
      "note": "Only stamped once when Number of Outbound Calls = 1",
      "tags": [
        "property",
        "contact",
        "speed-to-lead",
        "timestamp"
      ]
    },
    {
      "id": "stl-prop-002",
      "name": "SM | Speed to Lead Calculation",
      "fieldType": "Calculation",
      "group": "Speed to Lead",
      "calculationType": "Time between",
      "calculation": "Start Date: Lead Delegated Date/Time Stamp | End Date: SM | First Outbound Call Date",
      "purpose": "Automatically calculates time elapsed from delegation to first call attempt",
      "usedIn": "Speed to Lead Range Stamp workflow (filter), Speed to Lead dashboards, Rep performance reporting",
      "tags": [
        "property",
        "contact",
        "speed-to-lead",
        "calculated"
      ]
    },
    {
      "id": "stl-prop-003",
      "name": "SM | Speed to Lead Range Stamp",
      "fieldType": "Dropdown",
      "group": "Speed to Lead",
      "purpose": "Color-coded time bucket for visual reporting. Categorizes Speed to Lead into 5 ranges.",
      "options": "Less Than 2 Hours (Green \ud83d\udfe2) | Less Than 24 Hours But More Than 2 Hours (Blue \ud83d\udd35) | Between 24 Hours & 48 Hours (Yellow \ud83d\udfe1) | Between 48 Hours & 96 Hours (Orange \ud83d\udfe0) | More Than 96 Hours (Red \ud83d\udd34)",
      "stampedBy": "Speed To Lead - First Touch Group Stamp workflow",
      "usedIn": "Speed to Lead dashboards (donut charts, KPI cards), Rep performance breakdown, Team SLA compliance tracking",
      "tags": [
        "property",
        "contact",
        "speed-to-lead",
        "color-coded"
      ]
    }
  ],
  "callProperties": [
    {
      "id": "call-prop-001",
      "name": "[INTERNAL] Call Time Range Raw",
      "fieldType": "Single Line Text",
      "group": "Call Info",
      "purpose": "Internal field - stores raw time string calculated by custom code (e.g., '10:00'). Not user-facing.",
      "stampedBy": "Setter Engine - Call Time Range Stamp workflow (Custom Code output)",
      "usedIn": "Branch logic in Call Time Range workflow, Intermediate calculation step",
      "tags": [
        "property",
        "call",
        "internal",
        "raw-data"
      ]
    },
    {
      "id": "call-prop-002",
      "name": "Call Date Range (EST)",
      "fieldType": "Dropdown",
      "group": "Call Info",
      "purpose": "User-facing time bucket for reporting. Powers 'Best Time to Call' dashboards.",
      "options": "7am to 9am | 9am to 11am | 11am to 1pm | 1pm to 3pm | 3pm to 5pm | 5pm to 7pm | 7pm to 11pm | 11pm to 7am",
      "stampedBy": "Setter Engine - Call Time Range Stamp workflow",
      "usedIn": "Connect Reports: Best Time to Call, Time optimization analysis, Setter performance by time window",
      "tags": [
        "property",
        "call",
        "reporting",
        "time-bucket"
      ]
    }
  ],
  "staticLists": [
    {
      "id": "list-001",
      "name": "ALL LEADS | Master Static List",
      "type": "Static",
      "link": "https://app.hubspot.com/contacts/23635629/objectLists/2079/filters",
      "purpose": "Ultimate safety net - permanent record of EVERY lead that enters the system.",
      "addedBy": "SM | Lifecycle - Lead Intake workflow (Step 3)",
      "useCases": "Data recovery and audits, Total lead generation metrics, Historical analysis",
      "tags": [
        "list",
        "static",
        "safety-net",
        "master"
      ]
    },
    {
      "id": "list-002",
      "name": "Master Static - VSL",
      "type": "Static",
      "link": "https://app.hubspot.com/contacts/23635629/objectLists/2173/filters",
      "purpose": "Permanent record of all VSL + DTA funnel leads. Never removes members.",
      "addedBy": "SM | Lifecycle - Lead Intake workflow \u2192 Branch 1 (Step 6)",
      "funnelIDs": "VSL-Optin-Nikkiey-WB4, VSL-DTA-Nikkiey-Macro, VSL-DTA-Nikkiey-Macro-LI, VSL-Optin-Andrea-WB4, VSL-Optin-Nikkiey-Meno, VSL-Optin-Maggie-WB4",
      "useCases": "Powers Active - VSL Leads (Warm - No App) gap list, VSL funnel performance attribution, Funnel-specific email sequences",
      "tags": [
        "list",
        "static",
        "vsl-funnel",
        "master"
      ]
    },
    {
      "id": "list-003",
      "name": "Master Static - Quiz",
      "type": "Static",
      "link": "https://app.hubspot.com/contacts/23635629/objectLists/2174/filters",
      "purpose": "Permanent record of all Quiz funnel leads. Never removes members.",
      "addedBy": "SM | Lifecycle - Lead Intake workflow \u2192 Branch 2 (Step 7)",
      "funnelIDs": "VSL-Quiz-Nikkiey-WB4, VSL-Quiz-Andrea-WB4, VSL-Quiz-Maggie-WB4",
      "useCases": "Powers Active - Quiz Leads (Warm - No App) gap list, Quiz funnel performance attribution, Funnel-specific email sequences",
      "tags": [
        "list",
        "static",
        "quiz-funnel",
        "master"
      ]
    },
    {
      "id": "list-004",
      "name": "Master Static - Low Ticket (PQL)",
      "type": "Static",
      "link": "https://app.hubspot.com/contacts/23635629/objectLists/2170/filters",
      "purpose": "Permanent record of all PQL buyers. Never removes members.",
      "addedBy": "PQL Helper Workflow",
      "whyNeeded": "Custom Object workflows cannot add contacts to Contact Lists - this solves that limitation",
      "useCases": "PQL buyer nurture sequences, LT \u2192 HT conversion tracking, Implementation call follow-up",
      "tags": [
        "list",
        "static",
        "pql",
        "low-ticket"
      ]
    }
  ],
  "activeLists": [
    {
      "id": "list-101",
      "name": "Setter Engine - Leads to Be Set",
      "type": "Active",
      "link": "https://app.hubspot.com/contacts/23635629/objectLists/2212/filters",
      "purpose": "Global pool of valid leads available for setter work. Foundation for priority views.",
      "filters": "Lifecycle stage is NONE of: Evangelist, Declass, Customer | SM Lead Status is NONE of: Bad Data, Do Not Contact, Blacklisted Customer, Unqualified",
      "useCase": "Base filter for all setter priority views and delegation logic",
      "tags": [
        "list",
        "active",
        "setter-engine",
        "global-pool"
      ]
    },
    {
      "id": "list-102",
      "name": "Active - Quiz Leads (Warm - No App)",
      "type": "Active",
      "link": "https://app.hubspot.com/contacts/23635629/objectLists/2182/filters",
      "purpose": "Gap analysis - Quiz opt-ins who dropped before application.",
      "filters": "'On my journey...' is UNKNOWN | Date of last meeting booked is UNKNOWN | Segment membership: IS MEMBER OF Master Static - Quiz",
      "useCase": "Setter outbound target or email nurture trigger - push toward application",
      "tags": [
        "list",
        "active",
        "quiz-funnel",
        "gap-list",
        "warm"
      ]
    },
    {
      "id": "list-103",
      "name": "Active - VSL Leads (Warm - No App)",
      "type": "Active",
      "link": "https://app.hubspot.com/contacts/23635629/objectLists/2181/filters",
      "purpose": "Gap analysis - VSL opt-ins who dropped before application.",
      "filters": "'On my journey...' is UNKNOWN | Date of last meeting booked is UNKNOWN | Segment membership: IS MEMBER OF Master Static - VSL",
      "useCase": "Setter outbound target or email nurture trigger - push toward application",
      "tags": [
        "list",
        "active",
        "vsl-funnel",
        "gap-list",
        "warm"
      ]
    },
    {
      "id": "list-104",
      "name": "Active - High Intent (App + No Call)",
      "type": "Active",
      "link": "https://app.hubspot.com/contacts/23635629/objectLists/2180/filters",
      "purpose": "THE GOLDMINE - 65,686 applicants who never booked. HIGHEST priority for outbound.",
      "filters": "'On my journey...' is KNOWN | Date of last meeting booked is UNKNOWN",
      "count": "65,686",
      "currentCount": "65,686 leads - MASSIVE revenue opportunity!",
      "useCase": "Primary setter outbound calling list - already qualified via application",
      "priority": "CRITICAL - These leads showed intent and provided investment history",
      "tags": [
        "list",
        "active",
        "high-intent",
        "app-no-book",
        "goldmine"
      ]
    },
    {
      "id": "list-105",
      "name": "Bad Data",
      "type": "Active",
      "link": "https://app.hubspot.com/contacts/23635629/objectLists/2179/filters",
      "purpose": "Global suppression - combines D-Class lifecycle + bad Lead Statuses.",
      "filters": "Lifecycle stage is any of: Declass OR SM Lead Status is any of: Bad Data, Do Not Contact, Blacklisted Customer",
      "useCase": "EXCLUDE from ALL setter lists, email campaigns, and calling queues",
      "tags": [
        "list",
        "active",
        "suppression",
        "global",
        "do-not-contact"
      ]
    }
  ],
  "smartViews": [
    {
      "id": "view-001",
      "name": "P1 - New Hot Leads",
      "type": "Smart View",
      "link": "https://app.hubspot.com/contacts/23635629/objects/0-1/views/57972208/list",
      "purpose": "Speed to lead priority. New leads not called today. THE 'CALL NOW' QUEUE.",
      "filters": "SM Lead Status = 'New' | Create Date < 5 days | SM | Setter Owner = Me | SM | Last Outbound Call Date \u2260 Today",
      "priority": "HIGHEST - Work this first",
      "tags": [
        "view",
        "priority",
        "p1",
        "hot-leads"
      ]
    },
    {
      "id": "view-002",
      "name": "P2 - Follow Ups",
      "type": "Smart View",
      "link": "https://app.hubspot.com/contacts/23635629/objects/0-1/views/57972472/list",
      "purpose": "Active leads in 'In Progress' status. Follow-up queue for warmed leads.",
      "filters": "SM Lead Status = 'In Progress' | SM | Setter Owner = Me",
      "priority": "HIGH",
      "tags": [
        "view",
        "priority",
        "p2",
        "follow-up"
      ]
    },
    {
      "id": "view-003",
      "name": "P3 - Round 2 (Double Dial)",
      "type": "Smart View",
      "link": "https://app.hubspot.com/contacts/23635629/objects/0-1/views/57973166/list",
      "purpose": "Leads called exactly once today. Aggressive same-day follow-up.",
      "filters": "SM | Number of Outbound Calls Today = 1 | SM | Setter Owner = Me | SM Lead Status = 'Prospecting'",
      "priority": "MEDIUM-HIGH",
      "tags": [
        "view",
        "priority",
        "p3",
        "double-dial"
      ]
    },
    {
      "id": "view-004",
      "name": "P4 - Warm Leads",
      "type": "Smart View",
      "link": "https://app.hubspot.com/contacts/23635629/objects/0-1/views/57973180/list",
      "purpose": "Older 'Prospecting' leads with high activity scores. Re-engaged.",
      "filters": "SM Lead Status = 'Prospecting' | SM | Activity Score > 50 | SM | Setter Owner = Me",
      "priority": "MEDIUM",
      "tags": [
        "view",
        "priority",
        "p4",
        "warm-leads"
      ]
    },
    {
      "id": "view-005",
      "name": "No-Shows / Cancels",
      "type": "Smart View",
      "link": "https://app.hubspot.com/contacts/23635629/objects/0-1/views/57973212/list",
      "purpose": "URGENT - Re-booking list for no-shows and cancellations.",
      "filters": "SM Lead Status = 'No Show/Cancel' | SM | Setter Owner = Me",
      "priority": "URGENT",
      "tags": [
        "view",
        "priority",
        "no-show",
        "rebook"
      ]
    }
  ],
  "customObjects": [
    {
      "id": "obj-001",
      "name": "Low Ticket Purchase",
      "type": "Custom Object",
      "link": "https://app.hubspot.com/contacts/23635629/objects/2-54639890/views/all/list",
      "purpose": "Decouples low-ticket transactions ($30-40) from high-ticket Deal Pipeline. Enables PQL tracking without polluting sales forecast.",
      "properties": "Low Ticket Name (Single-line Text), LT Amount (Currency), Order Type (Dropdown), Funnel Name (Single-line Text), Purchase Date (Date), Associated Email (Single-line Text), Mailing Address (Single-line Text)",
      "associatedWith": "Contacts (1:many - one contact can have multiple LT purchases)",
      "usedIn": "SM | Lifecycle - PQL Router workflow, PQL Helper Workflow, LT \u2192 HT conversion tracking",
      "products": "Ultimate Guide (UGM), 7-Day Makeover (7DMM), Macro Method (MM), Fit LA 40 (FLA40)",
      "tags": [
        "object",
        "purchase",
        "pql",
        "low-ticket"
      ]
    }
  ],
  "pipelines": [
    {
      "id": "pipe-001",
      "name": "Sales Momentum Pipeline",
      "type": "Deal Pipeline",
      "purpose": "Unified setter-to-closer pipeline. Single source of truth for revenue forecasting.",
      "stages": "Setter Call Booked | Setter No Show/Canceled | Setter Qualified/Nurture | Closer Call Booked | Closer Call No Show/Canceled | Red Zone | Closer Qualified/Nurture | Closed Won | Closed Lost | DQ",
      "usedIn": "SM | Deal Pipeline Automation (Big Brain) workflow, SM | Global Meetings Tool Sync workflow (creates deals), Revenue forecasting, All sales reporting",
      "note": "Unified pipeline replaced separate Setter + Closer pipelines",
      "tags": [
        "pipeline",
        "deal",
        "unified",
        "revenue"
      ]
    },
    {
      "id": "pipe-002",
      "name": "Low Ticket Purchases Pipeline",
      "type": "Custom Object Pipeline",
      "purpose": "Tracks status of low-ticket orders. Separate from high-ticket sales.",
      "stages": "New (Order initiated) | Purchased (Payment successful - triggers PQL lifecycle) | Failed/Abandoned Cart (Payment failed or abandoned)",
      "usedIn": "SM | Lifecycle - PQL Router workflow (listens for 'Purchased' stage), LT product performance tracking, Abandoned cart recovery",
      "tags": [
        "pipeline",
        "object",
        "low-ticket",
        "pql"
      ]
    }
  ],
  "dashboards": [
    {
      "id": "dash-001",
      "name": "Speed To Lead Tracking",
      "link": "https://app.hubspot.com/reports-dashboard/23635629/view/18566973",
      "purpose": "Comprehensive Speed to Lead analytics. Tracks delegation velocity, first touch timing, and rep performance across time periods.",
      "reportSections": "This Quarter/Month/Week: Total # of leads delegated (KPI), Speed to Lead % breakdown (Donut), Speed to Lead # breakdown (KPI cards) | By Rep: # of leads delegated by rep (Table), % of leads contacted by bucket (Stacked bar), Leads with no first contact (Red flag KPI)",
      "useCases": "Track team SLA compliance, Identify slow responders, Optimize delegation timing, Monitor rep performance, Identify training needs",
      "tags": [
        "dashboard",
        "speed-to-lead",
        "reporting",
        "analytics"
      ]
    }
  ]
};
