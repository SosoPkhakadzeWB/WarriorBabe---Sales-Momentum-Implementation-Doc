// WarriorBabe Sales Momentum Documentation Data
// EXACT workflows and lists from HubSpot instance - December 2025

const documentationData = {
    
    // WORKFLOWS - Exact 10 workflows from HubSpot
    workflows: [
        {
            id: 'wf-001',
            name: 'Setter Engine - Call Time Range Stamp Workflow',
            status: 'on',
            objectType: 'Call',
            folder: '00. Sales Momentum - Automation',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1748739678/edit',
            description: 'Uses Custom Code (Node.js 20.x) to calculate EST time bucket for every outbound call. Converts UTC timestamp to Eastern Time, buckets into 2-hour ranges (7am-11pm) plus overnight bucket (11pm-7am). Powers "Best Time to Call" analytics.',
            purpose: 'Tracks which time windows yield optimal connect and conversion rates',
            trigger: 'Record created (Call) has been completed',
            filters: 'No additional filters',
            steps: [
                '1. Custom Code (Node.js 20.x): Reads hs_timestamp, converts to EST, calculates time bucket',
                '2. Edit Record: Stamps [INTERNAL] Call Time Range Raw with time string (e.g., "10:00")',
                '3. Branch (8-way): Routes to time bucket based on Call Time Range Raw value',
                '   • 7am to 9am',
                '   • 9am to 11am',
                '   • 11am to 1pm',
                '   • 1pm to 3pm',
                '   • 3pm to 5pm',
                '   • 5pm to 7pm',
                '   • 7pm to 11pm',
                '   • 11pm to 7am (overnight)',
                '4. Edit Record (per branch): Sets Call Date Range (EST) dropdown to matching bucket value'
            ],
            customCodeLogic: 'Reads hs_timestamp → Converts to America/New_York timezone → Extracts hour (0-23) → Maps to 8 time buckets → Returns bucket string',
            reportingUse: 'Connect Reports based on "Call Date Range (EST)" to identify peak performance windows',
            tags: ['workflow', 'call', 'analytics', 'custom-code', 'active']
        },
        {
            id: 'wf-002',
            name: 'Setter Engine - New Lead Delegation',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1747917832/edit',
            status: 'on',
            objectType: 'Contact',
            folder: '00. Sales Momentum - Automation',
            description: 'Round-robin delegation for VSL and Quiz leads. Called by Lead Intake workflow (not time-triggered). Rotates Contact Owner among Setter Team, stamps delegation timestamp, sends in-app notification.',
            purpose: 'Ensures balanced lead distribution and immediate setter awareness',
            trigger: 'Manually triggered only (called from Lead Intake workflow Step 8 or 9)',
            steps: [
                '1. Branch: Checks segment membership',
                '   • Branch 1: Is member of Master Static - VSL',
                '   • Branch 2: Is member of Master Static - Quiz',
                '2. Rotate Record to Owner: Rotates Contact Owner among Setter Team (round-robin)',
                '3. Edit Record: Stamps Lead Delegated Date/Time Stamp to current timestamp',
                '4. Send In-App Notification:',
                '   • Recipients: Contact owner',
                '   • Subject: {{ firstname }} {{ lastname }} - Has Been Assigned To You',
                '   • Body: "New lead has been assigned to you at {{ lead_delegated_datetime_stamp }}"'
            ],
            note: 'Both branches execute identical actions - only difference is entry filter',
            tags: ['workflow', 'contact', 'delegation', 'round-robin', 'active']
        },
        {
            id: 'wf-003',
            name: 'Universal Call Tracker',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1748363913/edit',
            status: 'on',
            objectType: 'Contact',
            folder: '00. Sales Momentum - Automation',
            description: 'Dialer-agnostic outbound call tracker. Works with Linq, Aloware, or HubSpot native. Stamps last call date and increments call counter. Critical for P1 list logic ("not called today").',
            purpose: 'Universal tracking system for call volume and timing - prevents setter burnout',
            trigger: 'Call ended has been completed',
            filters: [
                'Call Outcome is known',
                'Call Direction is any of: OUTBOUND'
            ],
            steps: [
                '1. Edit Record: Sets SM | Last Outbound Call Date to current timestamp',
                '2. Increase Property Value: Increments SM | Number of Outbound Calls by 1'
            ],
            whyImportant: 'Powers P1 list filter: "SM | Last Outbound Call Date ≠ Today" - prevents double-dialing same lead',
            tags: ['workflow', 'contact', 'call-tracking', 'dialer-agnostic', 'active']
        },
        {
            id: 'wf-004',
            name: 'SM | Deal Pipeline Automation (Big Brain)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit',
            status:'SM | Lifecycle - PQL Router (LT Purchase)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744065923/edit',
            status:'SM | Global Meetings Tool Sync',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1747352986/edit',
            status:'SM | Lifecycle - Lead Intake (Entry Points)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743063732/edit',
            status:'SM | Lifecycle - Lead Intake (Entry Points)',
            status: 'on',
            objectType: 'Contact',
            folder: '00. Sales Momentum - Automation',
            description: 'Entry gate for all new leads. Triggers on opt-in forms (Opt In Form OR Lead Intake Form). Sets Lead lifecycle, stamps opt-in time, adds to ALL LEADS master list, routes to funnel-specific static lists (VSL/Quiz), then calls delegation workflow.',
            purpose: 'First touchpoint - establishes lead in system and routes to correct processing path',
            trigger: 'Form submission on any page',
            triggerForms: ['Opt In Form', 'Lead Intake Form'],
            steps: [
                '1. Edit Record: Sets SM Lead Status = "New"',
                '2. Edit Record: Sets Lifecycle Stage = "Lead"',
                '3. Add to Static List: ALL LEADS | Master Static List',
                '4. Edit Record: Stamps Last Opt-in Time-Stamp to current timestamp',
                '5. Branch: Routes by Funnel ID',
                '   • Branch 1 (VSL): If Funnel ID is any of VSL funnel IDs',
                '     → Add to Static List: Master Static - VSL',
                '     → Go to Workflow: Setter Engine - New Lead Delegation',
                '   • Branch 2 (Quiz): If Funnel ID is any of Quiz funnel IDs',
                '     → Add to Static List: Master Static - Quiz',
                '     → Go to Workflow: Setter Engine - New Lead Delegation'
            ],
            vslFunnelIDs: ['VSL-Optin-Nikkiey-WB4', 'VSL-DTA-Nikkiey-Macro', 'VSL-DTA-Nikkiey-Macro-LI', 'VSL-Optin-Andrea-WB4', 'VSL-Optin-Nikkiey-Meno', 'VSL-Optin-Maggie-WB4'],
            quizFunnelIDs: ['VSL-Quiz-Nikkiey-WB4', 'VSL-Quiz-Andrea-WB4', 'VSL-Quiz-Maggie-WB4'],
            tags: ['workflow', 'contact', 'entry-point', 'lifecycle', 'active']
        },
        {
            id: 'wf-005',
            name: 'SM | Deal Pipeline Automation (Big Brain)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit',
            status:'SM | Lifecycle - PQL Router (LT Purchase)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744065923/edit',
            status:'SM | Global Meetings Tool Sync',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1747352986/edit',
            status:'SM | Lifecycle - Lead Intake (Entry Points)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743063732/edit',
            status:'SM | Deal Pipeline Automation (Big Brain)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit',
            status:'SM | Lifecycle - PQL Router (LT Purchase)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744065923/edit',
            status:'SM | Global Meetings Tool Sync',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1747352986/edit',
            status: 'on',
            objectType: 'Contact',
            folder: '00. Sales Momentum - Automation',
            description: 'Attribution workflow - distinguishes Setter-Booked vs Self-Booked meetings. Reads "Meeting Type of Last Booking" (populated by Zapier from Calendly event name). Sets correct Lifecycle (SQL for setter bookings, MQL for self-bookings) and creates Deal in Sales Momentum Pipeline.',
            purpose: 'Proper attribution between setter-generated SQLs and self-booked MQLs',
            trigger: 'Property value changed: Meeting Type of Last Booking',
            triggerCondition: 'New value is known',
            steps: [
                '1. Branch: Checks Meeting Type of Last Booking value',
                '   • Branch 1 (Setter): = "Body Transformation Assessment - WB"',
                '     → Edit Record: Sets Lifecycle Stage = Sales Qualified Lead',
                '     → Create Record: Deal with name "{{ firstname }} {{ lastname }} - Strategy Session"',
                '       Pipeline/Stage: Closer Call Booked (Sales Momentum Pipeline)',
                '       Assign to: Contact owner',
                '   • Branch 2 (Self): = "Body Transformation Assessment"',
                '     → Edit Record: Sets Lifecycle Stage = Marketing Qualified Lead',
                '     → Create Record: Deal with name "{{ firstname }} {{ lastname }} - Strategy Session"',
                '       Pipeline/Stage: Closer Call Booked (Sales Momentum Pipeline)',
                '       Assign to: Contact owner'
            ],
            calendlyEventNames: {
                setter: 'Body Transformation Assessment - WB (includes " - WB" suffix)',
                self: 'Body Transformation Assessment (no suffix)'
            },
            note: 'Meeting Type property is populated by Zapier integration from Calendly webhook',
            tags: ['workflow', 'contact', 'meeting-sync', 'attribution', 'active']
        },
        {
            id: 'wf-006',
            name: 'SM | Deal Pipeline Automation (Big Brain)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit',
            status:'SM | Lifecycle - PQL Router (LT Purchase)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744065923/edit',
            status:'SM | Global Meetings Tool Sync',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1747352986/edit',
            status:'SM | Lifecycle - Lead Intake (Entry Points)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743063732/edit',
            status:'SM | Lifecycle - PQL Router (LT Purchase)',
            status: 'on',
            objectType: 'Low Ticket Purchase',
            folder: '00. Sales Momentum - Automation',
            description: 'Triggers when Low Ticket Purchase enters "Purchased" stage. 3-way branch based on pipeline stage (New/Purchased/Failed). Only "Purchased" branch has actions: stamps Purchase Date on LT object, then sets Lifecycle = PQL on ALL associated contacts.',
            purpose: 'Manages PQL lifecycle progression for Low Ticket buyers',
            trigger: 'Low Ticket Purchase pipeline stage is any of: Purchased (Low Ticket Purchases Pipeline)',
            steps: [
                '1. Branch: 3-way split by Low Ticket Purchase pipeline stage',
                '   • Branch 1 (New): No actions',
                '   • Branch 2 (Purchased): ← ACTIVE BRANCH',
                '     → Edit Record: Stamps Purchase Date on LT Purchase object to current timestamp',
                '     → Edit Record: Sets Lifecycle Stage = Product Qualified Lead on ALL associated contacts',
                '   • Branch 3 (Failed / Abandoned Cart): No actions'
            ],
            note: 'Works on Custom Object - automatically updates associated Contact records',
            tags: ['workflow', 'object', 'pql', 'purchase', 'active']
        },
        {
            id: 'wf-007',
            name: 'PQL Helper Workflow (Adding To List)',
            status: 'on',
            objectType: 'Contact',
            folder: '00. Sales Momentum - Automation',
            description: 'Helper workflow to populate Master Static - Low Ticket (PQL) list. Triggers when contact is associated to a LT Purchase with stage = Purchased AND Purchase Date = Today. Adds contact to static list. Solves HubSpot limitation where Custom Object workflows can\'t add contacts to Contact Lists.',
            purpose: 'Populates PQL static list for marketing emails and segmentation',
            trigger: 'Contact is associated to Low Ticket Purchase',
            triggerFilters: [
                'Associated Low Ticket Purchase has: Low Ticket Purchase pipeline stage = Purchased',
                'Associated Low Ticket Purchase has: Purchase Date = Today'
            ],
            steps: [
                '1. Add to Static List: Master Static - Low Ticket (PQL)'
            ],
            whyNeeded: 'Custom Object workflows can only update Contact properties, not add to Contact Lists. This Contact-based workflow bridges the gap.',
            tags: ['workflow', 'contact', 'pql', 'helper', 'active']
        },
        {
            id: 'wf-008',
            name: 'SM | Deal Pipeline Automation (Big Brain)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit',
            status:'SM | Lifecycle - PQL Router (LT Purchase)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744065923/edit',
            status:'SM | Global Meetings Tool Sync',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1747352986/edit',
            status:'SM | Lifecycle - Lead Intake (Entry Points)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743063732/edit',
            status: 'SM | Deal Pipeline Automation (Big Brain)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit',
            status:'SM | Lead Status Big Brain',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1745555346/edit',
            status: 'on',
            objectType: 'Contact',
            folder: '00. Sales Momentum - Automation',
            description: 'Central SM Lead Status automation hub. Triggers on any Lead Status change. 18-way branch based on new status value. Currently only Branch 5 ("In Progress") has action - sets Lifecycle = SQL. Framework for future status-triggered automations.',
            purpose: 'Orchestrates Contact-level automations based on Lead Status changes',
            trigger: 'Property value changed: SM Lead Status',
            triggerCondition: 'New value is known',
            branches: 18,
            branchList: [
                '1. New (no action)',
                '2. Prospecting (no action)',
                '3. Bad Timing (no action)',
                '4. No Progress (no action)',
                '5. In Progress → Sets Lifecycle = Sales Qualified Lead ← ACTIVE',
                '6. Meeting Booked (no action)',
                '7. No Show/Cancel (no action)',
                '8. Open Deal (no action)',
                '9. Unqualified (no action)',
                '10. Decaying (no action)',
                '11. Red Zone (no action)',
                '12. Closed Won (no action)',
                '13. Closed Lost (no action)',
                '14. Bad Data (no action)',
                '15. Do Not Contact (no action)',
                '16. Blacklisted Customer (no action)',
                '17. Repeat Customer (no action)',
                '18. Contact (Non-Lead) (no action)'
            ],
            activeLogic: 'Only Branch 5 has action: When Lead Status = "In Progress" → Set Lifecycle = SQL',
            futureUse: 'Framework for adding notifications, task creation, or other automations per status',
            tags: ['workflow', 'contact', 'lead-status', 'big-brain', 'active']
        },
        {
            id: 'wf-009',
            name: 'SM | Deal Pipeline Automation (Big Brain)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit',
            status:'SM | Lifecycle - PQL Router (LT Purchase)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744065923/edit',
            status:'SM | Global Meetings Tool Sync',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1747352986/edit',
            status:'SM | Lifecycle - Lead Intake (Entry Points)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743063732/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            status: 'on',
            objectType: 'Contact',
            folder: '00. Sales Momentum - Automation',
            description: 'Application form qualification router. Triggers on WarriorBabe Application submission. 5-way branch based on income investment question. Branch 1 (<$1k) → Unqualified. Branches 2-5 ($1k+) → MQL.',
            purpose: 'Automated marketing qualification based on application self-reported investment capacity',
            trigger: 'Form submission: WarriorBabe Application on any page',
            qualificationQuestion: '"On my journey to get healthy fit and toned I\'ve already invested..."',
            steps: [
                '1. Branch: 5-way split by income investment answer',
                '   • Branch 1: = "Less than $1,000"',
                '     → Edit Record: Sets SM Lead Status = "Unqualified"',
                '   • Branch 2: = "$1,000 to $5,000"',
                '     → Edit Record: Sets Lifecycle Stage = "Marketing Qualified Lead"',
                '   • Branch 3: = "$5,000 to $10,000"',
                '     → Edit Record: Sets Lifecycle Stage = "Marketing Qualified Lead"',
                '   • Branch 4: = "$10,000 to $20,000"',
                '     → Edit Record: Sets Lifecycle Stage = "Marketing Qualified Lead"',
                '   • Branch 5: = "$20,000 or more"',
                '     → Edit Record: Sets Lifecycle Stage = "Marketing Qualified Lead"'
            ],
            qualificationLogic: '<$1k = Unqualified (no setter outreach) | $1k+ = MQL (eligible for setter follow-up)',
            tags: ['workflow', 'contact', 'mql', 'application', 'active']
        },
        {
            id: 'wf-010',
            name: 'SM | Deal Pipeline Automation (Big Brain)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit',
            status:'SM | Lifecycle - PQL Router (LT Purchase)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744065923/edit',
            status:'SM | Global Meetings Tool Sync',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1747352986/edit',
            status:'SM | Lifecycle - Lead Intake (Entry Points)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743063732/edit',
            status:'SM | Deal Pipeline Automation (Big Brain)',
            status: 'on',
            objectType: 'Deal',
            folder: '00. Sales Momentum - Automation',
            description: 'Central Deal Pipeline automation hub. Triggers on any Deal Stage change in Sales Momentum Pipeline. 10-way branch by stage. Key actions: Branch 3 (Setter Qualified) → Sets SQL. Branch 4 (Closer Call Booked) → Sub-branch checks if Lifecycle ≠ MQL, then sets SQL (preserves self-booked MQL attribution).',
            purpose: 'Orchestrates Deal-level automations and lifecycle updates based on pipeline movement',
            trigger: 'Property value changed: Deal stage',
            triggerCondition: 'New value is known',
            triggerFilter: 'Pipeline = Sales Momentum Pipeline',
            branches: 10,
            branchList: [
                '1. Setter Call Booked (no action)',
                '2. Setter No Show / Canceled (no action)',
                '3. Setter Qualified / Nurture',
                '   → Edit Record: Sets Lifecycle = Sales Qualified Lead on associated contacts',
                '4. Closer Call Booked',
                '   → Sub-branch: If associated contact Lifecycle ≠ Marketing Qualified Lead',
                '     → Edit Record: Sets Lifecycle = Sales Qualified Lead',
                '   (Preserves MQL status for self-booked leads)',
                '5. Closer Call No Show / Canceled (no action)',
                '6. Red Zone (no action)',
                '7. Closer Qualified / Nurture (no action)',
                '8. Closed Won (no action)',
                '9. Closed Lost (no action)',
                '10. DQ (no action)'
            ],
            sqlLogic: 'Sets SQL for Setter Qualified stage AND Closer Call Booked stage (unless already MQL)',
            mqlPreservation: 'Branch 4 sub-branch ensures self-booked leads (MQLs) stay MQLs, not upgraded to SQL',
            tags: ['workflow', 'deal', 'pipeline', 'big-brain', 'active']
        },
        {
            id: 'wf-011',
            name: 'Lead Delegation, Assignment, & Speed To Lead Tracking',
            status: 'on',
            objectType: 'Contact',
            folder: '00. Sales Momentum - Automation',
            description: 'New delegation system that triggers when leads are added to "Setter Engine - Leads to Be Set" list. Sets marketing contact status, rotates to Setter Team, stamps Setter Owner, then calls Delegation Date/Time Stamp workflow.',
            purpose: 'Automated lead distribution triggered by list membership with marketing contact flagging',
            trigger: 'Segment membership changed: is added to segment "Setter Engine - Leads to Be Set"',
            steps: [
                '1. Delay: 2 minutes',
                '2. Set Marketing Contact Status: Enrolled contact set as marketing contact',
                '3. Rotate Record to Owner: Rotates contact within Setter Team (1 team)',
                '4. Edit Record: Sets Setter Owner = Contact Owner',
                '5. Go to Workflow: Triggers "Delegation Date/Time Stamp" workflow'
            ],
            note: 'This workflow replaces manual delegation. Automatically fires when contact enters the valid leads pool.',
            tags: ['workflow', 'contact', 'delegation', 'new-system', 'active']
        },
        {
            id: 'wf-012',
            name: 'Delegation Date/Time Stamp',
            status: 'on',
            objectType: 'Contact',
            folder: '00. Sales Momentum - Automation',
            description: 'Called by Lead Delegation workflow. Stamps delegation timestamp and sends in-app notification to assigned setter. Only runs during business hours (Mon-Fri, 8am-6pm EST).',
            purpose: 'Records exact delegation time and notifies setter - operates within business hours only',
            trigger: 'Manually triggered only (called by "Lead Delegation, Assignment, & Speed To Lead Tracking")',
            scheduleRestrictions: 'Mon-Fri, 8:00 AM - 6:00 PM EST only',
            steps: [
                '1. Delay: 1 minute',
                '2. Edit Record: Sets "Lead Delegated Date/Time Stamp" to current timestamp',
                '3. Send In-App Notification: Sends "{{ First Name }} {{ Last Name }} - Has Been Assigned To You" to Setter Owner'
            ],
            whyScheduleRestriction: 'Prevents notifications outside business hours - actions queue until Monday 8am if triggered on weekend',
            tags: ['workflow', 'contact', 'delegation', 'timestamp', 'active']
        },
        {
            id: 'wf-013',
            name: 'Speed To Lead - Datetime Time Stamp',
            status: 'on',
            objectType: 'Contact',
            folder: '00. Sales Momentum - Automation',
            description: 'Triggers when setter makes their FIRST outbound call (Number of Outbound Calls = 1). Stamps the exact datetime of first touch for Speed to Lead calculation.',
            purpose: 'Locks in exact timestamp of first call attempt for Speed to Lead metrics',
            trigger: 'Contact enrolled (no specific trigger event)',
            filters: 'SM | Number of Outbound Calls is equal to 1',
            steps: [
                '1. Edit Record: Sets "SM | First Outbound Call Date" to current timestamp'
            ],
            calculation: 'Speed to Lead = First Outbound Call Date - Lead Delegated Date/Time Stamp',
            tags: ['workflow', 'contact', 'speed-to-lead', 'timestamp', 'active']
        },
        {
            id: 'wf-014',
            name: 'Speed To Lead - First Touch Group Stamp',
            status: 'on',
            objectType: 'Contact',
            folder: '00. Sales Momentum - Automation',
            description: 'Categorizes leads into Speed to Lead time buckets after first call is made. 5-way branch based on calculated "Speed to Lead" value. Stamps colored badge for reporting.',
            purpose: 'Buckets Speed to Lead into reportable ranges with color-coded badges',
            trigger: 'Contact enrolled (no specific trigger event)',
            filters: [
                'SM | Number of Outbound Calls is greater than or equal to 1',
                'Speed To Lead is known'
            ],
            steps: [
                '1. Branch (5-way): Based on "SM | Speed to Lead Range Stamp" property',
                '   • Branch 1: Less Than 2 Hours → Stamps "Less Than 2 Hours" (Green)',
                '   • Branch 2: Less Than 24 Hours (But More Than 2 Hours) → Stamps "Less Than 24 Hours..." (Blue)',
                '   • Branch 3: Between 24 Hours & 48 Hours → Stamps "Between 24 Hours & 48 Hours" (Yellow)',
                '   • Branch 4: Between 48 Hours & 96 Hours → Stamps "Between 48 Hours & 96 Hours" (Orange)',
                '   • Branch 5: More Than 96 Hours → Stamps "More Than 96 Hours" (Red)',
                '2. Edit Record (per branch): Sets "SM | Speed to Lead Range Stamp" to matching bucket value'
            ],
            colorCoding: '<2hrs = Green | 2-24hrs = Blue | 24-48hrs = Yellow | 48-96hrs = Orange | 96hrs+ = Red',
            tags: ['workflow', 'contact', 'speed-to-lead', 'reporting', 'active']
        }
    ],

    // CONTACT PROPERTIES
    contactProperties: [
        {
            id: 'prop-001',
            name: 'SM | Deal Pipeline Automation (Big Brain)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit',
            status:'SM | Lifecycle - PQL Router (LT Purchase)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744065923/edit',
            status:'SM | Global Meetings Tool Sync',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1747352986/edit',
            status:'SM | Lifecycle - Lead Intake (Entry Points)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743063732/edit',
            fieldType: 'Dropdown',
            group: 'Sales Momentum',
            purpose: 'Core setter work queue status. Tracks prospecting progress independently of Lifecycle Stage.',
            options: ['New', 'Prospecting', 'In Progress', 'Bad Timing', 'No Progress', 'Meeting Booked', 'No Show/Cancel', 'Open Deal', 'Unqualified', 'Decaying', 'Red Zone', 'Closed Won', 'Closed Lost', 'Bad Data', 'Do Not Contact', 'Blacklisted Customer', 'Repeat Customer', 'Contact (Non-Lead)'],
            usedIn: [
                'Every setter Smart View (P1-P5)',
                'Setter Engine | Lead Status Big Brain workflow',
                'Bad Data suppression list',
                'Setter delegation and rotation logic'
            ],
            note: 'Created as parallel property to avoid breaking 760k+ legacy contact records',
            tags: ['property', 'contact', 'core', 'setter-engine']
        },
        {
            id: 'prop-002',
            name: 'SM | Deal Pipeline Automation (Big Brain)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit',
            status:'SM | Lifecycle - PQL Router (LT Purchase)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744065923/edit',
            status:'SM | Global Meetings Tool Sync',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1747352986/edit',
            status:'SM | Lifecycle - Lead Intake (Entry Points)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743063732/edit',
            status:'SM | Setter Owner',
            fieldType: 'User',
            group: 'SM Setter Engine',
            purpose: 'Attribution property - preserves setter credit even when Contact Owner changes to Closer',
            stampedBy: 'Setter Engine - New Lead Delegation workflow',
            usedIn: [
                'Setter Smart Views (filter by "Me")',
                'Commission tracking',
                'Performance reporting'
            ],
            tags: ['property', 'contact', 'attribution', 'setter']
        },
        {
            id: 'prop-003',
            name: 'SM | Deal Pipeline Automation (Big Brain)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit',
            status:'SM | Lifecycle - PQL Router (LT Purchase)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744065923/edit',
            status:'SM | Global Meetings Tool Sync',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1747352986/edit',
            status:'SM | Lifecycle - Lead Intake (Entry Points)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743063732/edit',
            status:'SM | Last Outbound Call Date',
            fieldType: 'Date and Time',
            group: 'SM Setter Engine',
            purpose: 'Timestamp of most recent outbound call. Powers P1 list exclusion logic.',
            stampedBy: 'Universal Call Tracker workflow',
            usedIn: [
                'P1 list filter: Exclude if called today',
                'Call velocity reporting',
                'Cadence compliance'
            ],
            tags: ['property', 'contact', 'call-tracking', 'timestamp']
        },
        {
            id: 'prop-004',
            name: 'SM | Deal Pipeline Automation (Big Brain)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit',
            status:'SM | Lifecycle - PQL Router (LT Purchase)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744065923/edit',
            status:'SM | Global Meetings Tool Sync',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1747352986/edit',
            status:'SM | Lifecycle - Lead Intake (Entry Points)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743063732/edit',
            status:'SM | Number of Outbound Calls',
            fieldType: 'Number',
            group: 'SM Setter Engine',
            purpose: 'Running count of total outbound calls. Used for No Progress identification.',
            stampedBy: 'Universal Call Tracker workflow (incremented)',
            usedIn: [
                'No Progress trigger (>10 calls)',
                'Touch density reporting',
                'Setter performance metrics'
            ],
            tags: ['property', 'contact', 'call-tracking', 'volume']
        },
        {
            id: 'prop-005',
            name: 'Meeting Type of Last Booking',
            fieldType: 'Single Line Text',
            group: 'SM Setter Engine',
            purpose: 'Calendly event name captured by Zapier. Distinguishes setter vs self bookings.',
            populatedBy: 'Zapier (Calendly → HubSpot)',
            usedIn: [
                'SM | Global Meetings Tool Sync workflow',
                'SQL vs MQL determination',
                'Attribution reporting'
            ],
            values: {
                setter: 'Body Transformation Assessment - WB',
                self: 'Body Transformation Assessment'
            },
            tags: ['property', 'contact', 'meeting', 'attribution']
        },
        {
            id: 'prop-006',
            name: 'Lead Delegated Date/Time Stamp',
            fieldType: 'Date and Time',
            group: 'SM Setter Engine',
            purpose: 'Timestamp when lead was assigned to current setter. Speed-to-lead calculation.',
            stampedBy: 'Setter Engine - New Lead Delegation workflow',
            usedIn: [
                'Speed to Lead reporting',
                'Lead age calculations',
                'Delegation audit trail'
            ],
            tags: ['property', 'contact', 'delegation', 'timestamp']
        },
        {
            id: 'prop-007',
            name: 'Last Opt-in Time-Stamp',
            fieldType: 'Date and Time',
            group: 'SM Setter Engine',
            purpose: 'Timestamp of most recent form opt-in. Used for campaign-specific filtering.',
            stampedBy: 'SM | Lifecycle - Lead Intake workflow',
            usedIn: [
                'Campaign isolation filters',
                'Lead freshness reporting',
                'Re-engagement timing'
            ],
            tags: ['property', 'contact', 'opt-in', 'timestamp']
        },
        {
            id: 'prop-008',
            name: 'Funnel ID',
            fieldType: 'Single Line Text',
            group: 'Marketing Attribution',
            purpose: 'Tracks originating funnel. Hidden field on forms.',
            examples: ['VSL-Optin-Nikkiey-WB4', 'VSL-Quiz-Maggie-WB4', 'VSL-DTA-Nikkiey-Macro'],
            usedIn: [
                'Lead Intake workflow branching logic',
                'Master Static List routing',
                'Attribution reporting'
            ],
            tags: ['property', 'contact', 'attribution', 'funnel']
        },
        {
            id: 'prop-009',
            name: '"On my journey to get healthy fit and toned I\'ve already invested..."',
            fieldType: 'Dropdown',
            group: 'Application Form',
            purpose: 'Qualification question on WarriorBabe Application. Income investment capacity.',
            options: ['Less than $1,000', '$1,000 to $5,000', '$5,000 to $10,000', '$10,000 to $20,000', '$20,000 or more'],
            usedIn: [
                'SM | Lifecycle - MQL Router workflow',
                'Active list filters (App + No Call, VSL Warm, Quiz Warm)',
                'Qualification logic (<$1k = DQ)'
            ],
            tags: ['property', 'contact', 'application', 'qualification']
        },
        {
            id: 'prop-010',
            name: 'Date of last meeting booked in meetings tool',
            fieldType: 'Date and Time',
            group: 'Meetings',
            purpose: 'HubSpot native property - last meeting booking timestamp.',
            usedIn: [
                'All gap list filters (App + No Call, VSL Warm, Quiz Warm)',
                'No-show identification',
                'Booking velocity reporting'
            ],
            tags: ['property', 'contact', 'meeting', 'native']
        }
    ],

    // SPEED TO LEAD PROPERTIES
    speedToLeadProperties: [
        {
            id: 'stl-prop-001',
            name: 'SM | Deal Pipeline Automation (Big Brain)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit',
            status:'SM | Lifecycle - PQL Router (LT Purchase)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744065923/edit',
            status:'SM | Global Meetings Tool Sync',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1747352986/edit',
            status:'SM | Lifecycle - Lead Intake (Entry Points)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743063732/edit',
            status:'SM | First Outbound Call Date',
            fieldType: 'Date and Time Picker',
            group: 'Speed to Lead',
            purpose: 'Locks in the exact second the first call was made. Never changes after initial stamp.',
            stampedBy: 'Speed To Lead - Datetime Time Stamp workflow',
            usedIn: [
                'SM | Speed to Lead Calculation (as End Date)',
                'Speed to Lead reporting',
                'First touch velocity metrics'
            ],
            note: 'Only stamped once when Number of Outbound Calls = 1',
            tags: ['property', 'contact', 'speed-to-lead', 'timestamp']
        },
        {
            id: 'stl-prop-002',
            name: 'SM | Deal Pipeline Automation (Big Brain)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit',
            status:'SM | Lifecycle - PQL Router (LT Purchase)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744065923/edit',
            status:'SM | Global Meetings Tool Sync',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1747352986/edit',
            status:'SM | Lifecycle - Lead Intake (Entry Points)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743063732/edit',
            status:'SM | Speed to Lead Calculation',
            fieldType: 'Calculation',
            group: 'Speed to Lead',
            calculationType: 'Time between',
            calculation: {
                startDate: 'Lead Delegated Date/Time Stamp',
                endDate: 'SM | First Outbound Call Date',
                outputUnit: 'Minutes or Hours'
            },
            purpose: 'Automatically calculates time elapsed from delegation to first call attempt',
            usedIn: [
                'Speed to Lead Range Stamp workflow (filter)',
                'Speed to Lead dashboards',
                'Rep performance reporting'
            ],
            tags: ['property', 'contact', 'speed-to-lead', 'calculated']
        },
        {
            id: 'stl-prop-003',
            name: 'SM | Deal Pipeline Automation (Big Brain)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743607716/edit',
            status:'SM | Lifecycle - MQL Router (Application)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744092087/edit',
            status:'SM | Lifecycle - PQL Router (LT Purchase)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1744065923/edit',
            status:'SM | Global Meetings Tool Sync',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1747352986/edit',
            status:'SM | Lifecycle - Lead Intake (Entry Points)',
            link: 'https://app.hubspot.com/workflows/23635629/platform/flow/1743063732/edit',
            status:'SM | Speed to Lead Range Stamp',
            fieldType: 'Dropdown',
            group: 'Speed to Lead',
            purpose: 'Color-coded time bucket for visual reporting. Categorizes Speed to Lead into 5 ranges.',
            options: [
                {value: 'Less Than 2 Hours', color: 'Green', badge: '🟢'},
                {value: 'Less Than 24 Hours (But More Than 2 Hours)', color: 'Blue', badge: '🔵'},
                {value: 'Between 24 Hours & 48 Hours', color: 'Yellow', badge: '🟡'},
                {value: 'Between 48 Hours & 96 Hours', color: 'Orange', badge: '🟠'},
                {value: 'More Than 96 Hours', color: 'Red', badge: '🔴'}
            ],
            stampedBy: 'Speed To Lead - First Touch Group Stamp workflow',
            usedIn: [
                'Speed to Lead dashboards (donut charts, KPI cards)',
                'Rep performance breakdown',
                'Team SLA compliance tracking'
            ],
            tags: ['property', 'contact', 'speed-to-lead', 'color-coded']
        }
    ],

    // CALL PROPERTIES
    callProperties: [
        {
            id: 'call-prop-001',
            name: '[INTERNAL] Call Time Range Raw',
            fieldType: 'Single Line Text',
            group: 'Call Info',
            purpose: 'Internal field - stores raw time string calculated by custom code (e.g., "10:00"). Not user-facing.',
            stampedBy: 'Setter Engine - Call Time Range Stamp workflow (Custom Code output)',
            usedIn: [
                'Branch logic in Call Time Range workflow',
                'Intermediate calculation step'
            ],
            tags: ['property', 'call', 'internal', 'raw-data']
        },
        {
            id: 'call-prop-002',
            name: 'Call Date Range (EST)',
            fieldType: 'Dropdown',
            group: 'Call Info',
            purpose: 'User-facing time bucket for reporting. Powers "Best Time to Call" dashboards.',
            options: ['7am to 9am', '9am to 11am', '11am to 1pm', '1pm to 3pm', '3pm to 5pm', '5pm to 7pm', '7pm to 11pm', '11pm to 7am'],
            stampedBy: 'Setter Engine - Call Time Range Stamp workflow',
            usedIn: [
                'Connect Reports: Best Time to Call',
                'Time optimization analysis',
                'Setter performance by time window'
            ],
            tags: ['property', 'call', 'reporting', 'time-bucket']
        }
    ],

    // CUSTOM OBJECTS
    customObjects: [
        {
            id: 'obj-001',
            name: 'Low Ticket Purchase',
            link: 'https://app.hubspot.com/contacts/23635629/objects/2-54639890/views/all/list',
            type: 'Custom Object',
            purpose: 'Decouples low-ticket transactions ($30-40) from high-ticket Deal Pipeline. Enables PQL tracking without polluting sales forecast.',
            properties: [
                {name: 'Low Ticket Name', type: 'Single-line Text', purpose: 'Product name'},
                {name: 'LT Amount', type: 'Currency', purpose: 'Purchase value'},
                {name: 'Order Type', type: 'Dropdown', purpose: 'Upfront/Bump/Downsell'},
                {name: 'Funnel Name', type: 'Single-line Text', purpose: 'Marketing funnel attribution'},
                {name: 'Purchase Date', type: 'Date', purpose: 'Transaction timestamp'},
                {name: 'Associated Email', type: 'Single-line Text', purpose: 'Contact matching'},
                {name: 'Mailing Address', type: 'Single-line Text', purpose: 'Fulfillment'}
            ],
            associatedWith: 'Contacts (1:many - one contact can have multiple LT purchases)',
            usedIn: [
                'SM | Lifecycle - PQL Router workflow',
                'PQL Helper Workflow',
                'LT → HT conversion tracking'
            ],
            products: ['Ultimate Guide (UGM)', '7-Day Makeover (7DMM)', 'Macro Method (MM)', 'Fit LA 40 (FLA40)'],
            tags: ['object', 'purchase', 'pql', 'low-ticket']
        }
    ],

    // PIPELINES
    pipelines: [
        {
            id: 'pipe-001',
            name: 'Sales Momentum Pipeline',
            type: 'Deal Pipeline',
            purpose: 'Unified setter-to-closer pipeline. Single source of truth for revenue forecasting.',
            stages: [
                {name: 'Setter Call Booked', purpose: 'Implementation call scheduled'},
                {name: 'Setter No Show / Canceled', purpose: 'Setter call did not occur'},
                {name: 'Setter Qualified / Nurture', purpose: 'Setter confirmed qualified, may need nurture'},
                {name: 'Closer Call Booked', purpose: 'Strategy session scheduled with closer'},
                {name: 'Closer Call No Show / Canceled', purpose: 'Closer call did not occur'},
                {name: 'Red Zone', purpose: 'Offer made, high close probability'},
                {name: 'Closer Qualified / Nurture', purpose: 'Qualified but timing not right'},
                {name: 'Closed Won', purpose: 'Deal closed successfully'},
                {name: 'Closed Lost', purpose: 'Deal lost'},
                {name: 'DQ', purpose: 'Disqualified'}
            ],
            usedIn: [
                'SM | Deal Pipeline Automation (Big Brain) workflow',
                'SM | Global Meetings Tool Sync workflow (creates deals)',
                'Revenue forecasting',
                'All sales reporting'
            ],
            note: 'Unified pipeline replaced separate Setter + Closer pipelines',
            tags: ['pipeline', 'deal', 'unified', 'revenue']
        },
        {
            id: 'pipe-002',
            name: 'Low Ticket Purchases Pipeline',
            type: 'Custom Object Pipeline',
            purpose: 'Tracks status of low-ticket orders. Separate from high-ticket sales.',
            stages: [
                {name: 'New', purpose: 'Order initiated'},
                {name: 'Purchased', purpose: 'Payment successful - triggers PQL lifecycle'},
                {name: 'Failed / Abandoned Cart', purpose: 'Payment failed or abandoned'}
            ],
            usedIn: [
                'SM | Lifecycle - PQL Router workflow (listens for "Purchased" stage)',
                'LT product performance tracking',
                'Abandoned cart recovery'
            ],
            tags: ['pipeline', 'object', 'low-ticket', 'pql']
        }
    ],

    // STATIC LISTS
    staticLists: [
        {
            id: 'list-001',
            name: 'ALL LEADS | Master Static List',
            link: 'https://app.hubspot.com/contacts/23635629/objectLists/2079/filters',
            type: 'ALL LEADS | Master Static List',
            link: 'https://app.hubspot.com/contacts/23635629/objectLists/2079/filters',
            type: 'Static',
            count: 0,
            purpose: 'Ultimate safety net - permanent record of EVERY lead that enters the system.',
            addedBy: 'SM | Lifecycle - Lead Intake workflow (Step 3)',
            filters: 'None - Static list populated by workflow',
            whyItExists: 'Data integrity failsafe - if workflows break or leads slip through, this proves they existed',
            useCases: [
                'Data recovery and audits',
                'Total lead generation metrics',
                'Historical analysis'
            ],
            tags: ['list', 'static', 'safety-net', 'master']
        },
        {
            id: 'list-002',
            name: 'Master Static - VSL',
            link: 'https://app.hubspot.com/contacts/23635629/objectLists/2173/filters',
            type: 'Static',
            count: 0,
            purpose: 'Permanent record of all VSL + DTA funnel leads. Never removes members.',
            addedBy: 'SM | Lifecycle - Lead Intake workflow → Branch 1 (Step 6)',
            filters: 'None - Static list populated by workflow',
            funnelIDs: ['VSL-Optin-Nikkiey-WB4', 'VSL-DTA-Nikkiey-Macro', 'VSL-DTA-Nikkiey-Macro-LI', 'VSL-Optin-Andrea-WB4', 'VSL-Optin-Nikkiey-Meno', 'VSL-Optin-Maggie-WB4'],
            useCases: [
                'Powers Active - VSL Leads (Warm - No App) gap list',
                'VSL funnel performance attribution',
                'Funnel-specific email sequences'
            ],
            tags: ['list', 'static', 'vsl-funnel', 'master']
        },
        {
            id: 'list-003',
            name: 'Master Static - Quiz',
            link: 'https://app.hubspot.com/contacts/23635629/objectLists/2174/filters',
            type: 'Static',
            count: 0,
            purpose: 'Permanent record of all Quiz funnel leads. Never removes members.',
            addedBy: 'SM | Lifecycle - Lead Intake workflow → Branch 2 (Step 7)',
            filters: 'None - Static list populated by workflow',
            funnelIDs: ['VSL-Quiz-Nikkiey-WB4', 'VSL-Quiz-Andrea-WB4', 'VSL-Quiz-Maggie-WB4'],
            useCases: [
                'Powers Active - Quiz Leads (Warm - No App) gap list',
                'Quiz funnel performance attribution',
                'Funnel-specific email sequences'
            ],
            tags: ['list', 'static', 'quiz-funnel', 'master']
        },
        {
            id: 'list-004',
            name: 'Master Static - Low Ticket (PQL)',
            type: 'Static',
            count: 0,
            purpose: 'Permanent record of all PQL buyers. Never removes members.',
            addedBy: 'PQL Helper Workflow',
            filters: 'None - Static list populated by workflow',
            whyNeeded: 'Custom Object workflows can\'t add contacts to Contact Lists - this solves that limitation',
            useCases: [
                'PQL buyer nurture sequences',
                'LT → HT conversion tracking',
                'Implementation call follow-up'
            ],
            tags: ['list', 'static', 'pql', 'low-ticket']
        }
    ],

    // ACTIVE LISTS
    activeLists: [
        {
            id: 'list-101',
            name: 'Setter Engine - Leads to Be Set',
            link: 'https://app.hubspot.com/contacts/23635629/objectLists/2212/filters',
            type: 'Active',
            count: 0,
            purpose: 'Global pool of valid leads available for setter work. Foundation for priority views.',
            filters: {
                group1: [
                    'Lifecycle stage is NONE of: Evangelist, Declass, Customer',
                    'SM Lead Status is NONE of: Bad Data, Do Not Contact, Blacklisted Customer, Unqualified'
                ]
            },
            useCase: 'Base filter for all setter priority views and delegation logic',
            tags: ['list', 'active', 'setter-engine', 'global-pool']
        },
        {
            id: 'list-102',
            name: 'Active - Quiz Leads (Warm - No App)',
            type: 'Active',
            count: 0,
            purpose: 'Gap analysis - Quiz opt-ins who dropped before application.',
            filters: {
                group1: [
                    '"On my journey to get healthy fit and toned I\'ve already invested..." is UNKNOWN',
                    'Date of last meeting booked in meetings tool is UNKNOWN',
                    'Segment membership: IS MEMBER OF Master Static - Quiz'
                ]
            },
            useCase: 'Setter outbound target or email nurture trigger - push toward application',
            tags: ['list', 'active', 'quiz-funnel', 'gap-list', 'warm']
        },
        {
            id: 'list-103',
            name: 'Active - VSL Leads (Warm - No App)',
            type: 'Active',
            count: 0,
            purpose: 'Gap analysis - VSL opt-ins who dropped before application.',
            filters: {
                group1: [
                    '"On my journey to get healthy fit and toned I\'ve already invested..." is UNKNOWN',
                    'Date of last meeting booked in meetings tool is UNKNOWN',
                    'Segment membership: IS MEMBER OF Master Static - VSL'
                ]
            },
            useCase: 'Setter outbound target or email nurture trigger - push toward application',
            tags: ['list', 'active', 'vsl-funnel', 'gap-list', 'warm']
        },
        {
            id: 'list-104',
            name: 'Active - High Intent (App + No Call)',
            type: 'Active',
            count: 65686,
            purpose: 'THE GOLDMINE - Applicants who never booked. HIGHEST priority for outbound.',
            filters: {
                group1: [
                    '"On my journey to get healthy fit and toned I\'ve already invested..." is KNOWN',
                    'Date of last meeting booked in meetings tool is UNKNOWN'
                ]
            },
            currentCount: '65,686 leads - MASSIVE revenue opportunity!',
            useCase: 'Primary setter outbound calling list - already qualified via application',
            priority: 'CRITICAL - These leads showed intent and provided investment history',
            tags: ['list', 'active', 'high-intent', 'app-no-book', 'goldmine']
        },
        {
            id: 'list-105',
            name: 'Bad Data',
            link: 'https://app.hubspot.com/contacts/23635629/objectLists/2179/filters',
            type: 'Active',
            count: 0,
            purpose: 'Global suppression - combines D-Class lifecycle + bad Lead Statuses.',
            filters: {
                group1: 'Lifecycle stage is any of: Declass',
                or: true,
                group2: 'SM Lead Status is any of: Bad Data, Do Not Contact, Blacklisted Customer'
            },
            useCase: 'EXCLUDE from ALL setter lists, email campaigns, and calling queues',
            tags: ['list', 'active', 'suppression', 'global', 'do-not-contact']
        }
    ],

    // SMART VIEWS
    smartViews: [
        {
            id: 'view-001',
            name: 'P1 - New Hot Leads',
            link: 'https://app.hubspot.com/contacts/23635629/objects/0-1/views/57972208/list',
            type: 'Smart View',
            purpose: 'Speed to lead priority. New leads not called today. THE "CALL NOW" QUEUE.',
            filters: [
                'SM Lead Status = "New"',
                'Create Date < 5 days',
                'SM | Setter Owner = Me',
                'SM | Last Outbound Call Date ≠ Today'
            ],
            priority: 'HIGHEST - Work this first',
            tags: ['view', 'priority', 'p1', 'hot-leads']
        },
        {
            id: 'view-002',
            name: 'P2 - Follow Ups',
            link: 'https://app.hubspot.com/contacts/23635629/objects/0-1/views/57972472/list',
            type: 'Smart View',
            purpose: 'Active leads in "In Progress" status. Follow-up queue for warmed leads.',
            filters: [
                'SM Lead Status = "In Progress"',
                'SM | Setter Owner = Me'
            ],
            priority: 'HIGH',
            tags: ['view', 'priority', 'p2', 'follow-up']
        },
        {
            id: 'view-003',
            name: 'P3 - Round 2 (Double Dial)',
            type: 'Smart View',
            purpose: 'Leads called exactly once today. Aggressive same-day follow-up.',
            filters: [
                'SM | Number of Outbound Calls Today = 1',
                'SM | Setter Owner = Me',
                'SM Lead Status = "Prospecting"'
            ],
            priority: 'MEDIUM-HIGH',
            tags: ['view', 'priority', 'p3', 'double-dial']
        },
        {
            id: 'view-004',
            name: 'P4 - Warm Leads',
            link: 'https://app.hubspot.com/contacts/23635629/objects/0-1/views/57973180/list',
            type: 'Smart View',
            purpose: 'Older "Prospecting" leads with high activity scores. Re-engaged.',
            filters: [
                'SM Lead Status = "Prospecting"',
                'SM | Activity Score > 50',
                'SM | Setter Owner = Me'
            ],
            priority: 'MEDIUM',
            tags: ['view', 'priority', 'p4', 'warm-leads']
        },
        {
            id: 'view-005',
            name: 'No-Shows / Cancels',
            link: 'https://app.hubspot.com/contacts/23635629/objects/0-1/views/57973212/list',
            type: 'Smart View',
            purpose: 'URGENT - Re-booking list for no-shows and cancellations.',
            filters: [
                'SM Lead Status = "No Show/Cancel"',
                'SM | Setter Owner = Me'
            ],
            priority: 'URGENT',
            tags: ['view', 'priority', 'no-show', 'rebook']
        }
    ],

    // DASHBOARDS
    dashboards: [
        {
            id: 'dash-001',
            name: 'Speed To Lead Tracking',
            link: 'https://app.hubspot.com/reports-dashboard/23635629/view/18566973',
            purpose: 'Comprehensive Speed to Lead analytics. Tracks delegation velocity, first touch timing, and rep performance across time periods.',
            reportSections: [
                {
                    section: 'This Quarter / Month / Week (3 versions)',
                    reports: [
                        {name: 'Total # of leads delegated', type: 'KPI'},
                        {name: 'Speed to Lead % breakdown', type: 'Donut chart', breakdown: 'By time bucket (<2hr, 2-24hr, 24-48hr, 48-96hr, 96hr+)'},
                        {name: 'Speed to Lead # breakdown', type: 'KPI cards', metrics: 'Count per time bucket'}
                    ]
                },
                {
                    section: 'By Rep',
                    reports: [
                        {name: '# of leads delegated by rep', type: 'Table', groupBy: 'Setter Owner'},
                        {name: '% of leads contacted by bucket', type: 'Stacked bar chart', breakdown: 'Rep × Time bucket'},
                        {name: 'Leads with no first contact', type: 'Red flag KPI', filter: 'First Outbound Call Date is unknown'}
                    ]
                }
            ],
            useCases: [
                'Track team SLA compliance',
                'Identify slow responders',
                'Optimize delegation timing',
                'Monitor rep performance',
                'Identify training needs'
            ],
            tags: ['dashboard', 'speed-to-lead', 'reporting', 'analytics']
        }
    ]
};