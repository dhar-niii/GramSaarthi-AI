import React from "react";
import html2pdf from "html2pdf.js";

/* =========================================================
   11 LANGUAGE TRANSLATIONS
   Internal language values stay in English.
   Visible text changes according to selected language.
========================================================= */

const translations = {
  English: {
    step1: "Step 1 of 3",
    assessment: "BUSINESS ASSESSMENT",
    tellSituation: "Tell us about your situation.",
    assessmentDesc:
      "We'll use this information to find business opportunities that match your resources and local market.",
    location: "Where are you planning to start?",
    locationPlaceholder: "Enter village / town",
    capital: "How much own capital do you have?",
    capitalPlaceholder: "Example: ₹80,000",
    language: "Choose your language",
    skills: "What skills or experience do you have?",
    skillsPlaceholder: "Example: farming, tailoring, cooking...",
    resources: "What resources do you already have?",
    resourcesPlaceholder: "Example: land, shop, livestock...",
    businessIdea: "Do you already have a business idea?",
    selectBusiness: "Select a business",
    continue: "Continue",

    assessmentComplete: "Assessment Complete",
    businessMatch: "YOUR BUSINESS MATCH",
    found: "Here's what we found.",
    matchDesc:
      "Based on your information, these businesses could be a good match for your situation.",
    recommended: "#1 Recommended",
    matchScore: "Match Score",
    marketReach: "Market Reach",
    primaryCustomers: "Primary Customers",
    distributionChannels: "Distribution Channels",
    opportunity: "Opportunity Analysis",
    swot: "SWOT Analysis",
    localDemand: "Local Demand",
    capitalFit: "Capital Fit",
    resourceFit: "Resource Fit",
    risk: "Risk",
    exploreBusiness: "Explore Business",

    strengths: "Strengths",
    weaknesses: "Weaknesses",
    opportunities: "Opportunities",
    threats: "Threats",
    localThreats: "Local Threats",
    competitors: "Competitor Analysis",
    mainCompetitors: "Main Competitors",
    competitiveAdvantage: "Your Competitive Advantage",
    pricing: "Pricing Strategy",
    strategy: "Strategy:",
    suggestedPricing: "Suggested Pricing:",
    why: "Why:",
    recommendation: "GramSaarthi Recommendation",
    recommendedSteps: "Recommended Steps",

    marketAnalysis: "Market Analysis",
    hyperLocalMarket: "HYPER-LOCAL MARKET ANALYSIS",
    understandMarket: "Understand your local market.",
    marketDesc:
      "Here's a demo analysis of the opportunity around your selected location.",
    yourVillage: "Your Village",
    localMarketArea: "Local market area",
    estimatedDemand: "ESTIMATED DEMAND",
    high: "High",
    competition: "COMPETITION",
    medium: "Medium",
    growthPotential: "GROWTH POTENTIAL",
    strong: "Strong",
    seasonalDemand: "SEASONAL DEMAND",
    whenDemandHighest: "When is demand highest?",
    demoData: "Demo data",
    summer: "Summer",
    monsoon: "Monsoon",
    winter: "Winter",
    festival: "Festival",
    competitorMap: "COMPETITOR MAP",
    nearbyBusinessActivity: "Nearby business activity",
    illustrative: "Illustrative",
    localMarketRadius: "5–10 km local market",
    yourLocation: "Your location",
    mapNote:
      "This prototype uses illustrative data. Real competitor and market data can be connected through APIs later.",
    analyzeRisks: "Analyze Business Risks",

    riskAnalysis: "Risk Analysis",
    aiRiskAnalysis: "AI RISK ANALYSIS",
    knowRisks: "Know the risks before you invest.",
    riskDesc:
      "Understand the major risks associated with your selected business and how you can manage them.",
    overallRisk: "OVERALL BUSINESS RISK",
    manageablePlanning:
      "This risk level can be managed with careful planning.",
    marketRisk: "MARKET RISK",
    changingDemand: "Changing local demand",
    marketRiskDesc:
      "Customer demand may change with seasons, prices and local competition.",
    financialRisk: "FINANCIAL RISK",
    initialInvestment: "Initial investment",
    financialRiskDesc:
      "Keep enough working capital available while starting and growing the business.",
    seasonalRisk: "SEASONAL RISK",
    seasonDependentSales: "Season-dependent sales",
    seasonalRiskDesc:
      "Some businesses may experience changes in demand during different seasons.",
    low: "Low",
    aiSwot: "AI SWOT ANALYSIS",
    businessAtGlance: "Your business at a glance.",
    strongLocalDemand: "Strong local demand",
    repeatCustomers: "Potential for repeat customers",
    manageableScale: "Can start at a manageable scale",
    limitedResources: "Limited resources",
    consistentQuality: "Need to maintain consistent quality",
    limitedMarketReach: "Limited initial market reach",
    growingLocalDemand: "Growing local demand",
    digitalMarketing: "Digital marketing opportunities",
    governmentSupport: "Government support opportunities",
    newCompetitors: "New competitors",
    priceFluctuations: "Price fluctuations",
    seasonalChanges: "Seasonal changes",
    trySimulator: "Try Business Simulator",

    businessSimulator: "Business Simulator",
    whatIfSimulator: "WHAT-IF BUSINESS SIMULATOR",
    testIdea: "Test your idea before investing.",
    simulatorDesc:
      "Change the numbers below and see how your estimated business performance changes.",
    initialInvestment: "Initial Investment",
    customersPerDay: "Customers per day",
    averagePrice: "Average price per customer",
    monthlyExpenses: "Monthly Expenses",
    monthlyRevenue: "MONTHLY REVENUE",
    monthlyProfit: "MONTHLY PROFIT",
    yearlyProfit: "YEARLY PROFIT",
    gramSaarthiInsight: "GramSaarthi insight",
    simulatorNote:
      "This is a prototype estimate based on your assumptions. Actual results may vary depending on local demand, pricing, operating costs and other business conditions.",
    planFinances: "Plan Your Finances",

    financialPlanner: "Financial Planner",
    smartFinancialPlanning: "SMART FINANCIAL PLANNING",
    planFunding: "Plan your funding before you borrow.",
    financeDesc:
      "Understand your estimated investment, own contribution and possible financing requirement.",
    estimatedProjectCost: "ESTIMATED PROJECT COST",
    yourContribution: "YOUR CONTRIBUTION",
    estimatedFundingGap: "ESTIMATED FUNDING GAP",
    loanPreview: "LOAN PREVIEW",
    possibleRepayment: "Possible repayment scenario",
    loanAmount: "Loan Amount",
    interestRate: "Interest Rate",
    tenure: "Tenure",
    scheme: "Scheme",
    moratorium: "Moratorium",
    estimatedEmi: "Estimated EMI",
    repaymentRoadmap: "REPAYMENT ROADMAP",
    repaymentJourney: "Your estimated repayment journey",
    initialMoratorium: "Initial Moratorium",
    repaymentPeriod: "Repayment Period",
    monthlyEmi: "Monthly EMI",
    annualEmi: "Annual EMI",
    illustrative: "Illustrative",
    schemeNote:
      "This is an illustrative repayment estimate. Actual loan terms, interest, subsidy and moratorium depend on the lender and applicable scheme eligibility.",
    downloadReport: "Download Complete Report",
    downloadCompleteReport: "Download Complete Report",
    listen: "Listen",
    audioLoading: "Generating audio...",
    audioNotSupported: "Voice output is not supported in this browser.",
    audioError: "Unable to play the generated audio.",
    supportOpportunities: "SUPPORT OPPORTUNITIES",
    exploreSupport: "Explore possible support schemes",
    governmentBankSupport: "Government / Bank Support",
    supportDesc:
      "Depending on your location, business type and eligibility, you may be able to explore government schemes, subsidies or formal credit programs.",
    explore: "Explore",
    supportNote:
      "Scheme eligibility and availability should always be verified through official government or banking sources.",
    gramSaarthiRecommendation: "GramSaarthi recommendation",
    financeAdvice:
      "Start with the smallest practical investment, maintain emergency working capital and compare financing options before taking a loan.",
    generateRoadmap: "Generate My Business Roadmap",

    yourBusinessRoadmap: "Your Business Roadmap",
    personalizedRoadmap: "PERSONALIZED ROADMAP",
    pathIdeaAction: "Your path from idea to action.",
    roadmapDesc:
      "Here's a simple starting plan based on the information you provided.",
    recommendedBusiness: "RECOMMENDED BUSINESS",
    startingPoint: "YOUR STARTING POINT",
    notSpecified: "Not specified",
    actionPlan: "30-DAY ACTION PLAN",
    startSmall: "Start small. Learn. Then grow.",
    validateDemand: "Validate local demand",
    validateDemandDesc:
      "Talk to potential customers and understand what they actually need before spending heavily.",
    smallPilot: "Start with a small pilot",
    smallPilotDesc:
      "Test your product or service at a manageable scale and record your costs and sales.",
    trackNumbers: "Track your numbers",
    trackNumbersDesc:
      "Monitor customers, revenue, expenses and monthly profit instead of relying only on assumptions.",
    scaleCarefully: "Scale carefully",
    scaleCarefullyDesc:
      "Reinvest profits and consider additional financing only after the business shows consistent demand.",
    estimatedMonthlyRevenue: "ESTIMATED MONTHLY REVENUE",
    estimatedMonthlyProfit: "ESTIMATED MONTHLY PROFIT",
    businessRisk: "BUSINESS RISK",
    finalAdvice: "GramSaarthi's final advice",
    finalAdviceDesc:
      "Don't begin with the biggest possible investment. Start with a practical pilot, validate demand, control costs and grow when your numbers support it.",
    backToGramSaarthi: "Back to GramSaarthi",

    features: "Features",
    howItWorks: "How It Works",
    startAssessment: "Start Assessment",
    aiPoweredAdvisor: "AI-Powered Rural Business Advisor",
    smarterBusiness: "Turn your idea into a smarter business.",
    heroDesc:
      "GramSaarthi AI helps rural entrepreneurs discover the right business, understand their local market, manage risks and plan their finances before taking a loan.",
    startBusinessAssessment: "Start Business Assessment",
    exploreFeatures: "Explore Features",
    simpleToUse: "Simple to use",
    localInsights: "Local insights",
    smartFinancialPlanning: "Smart financial planning",
    aiBusinessAdvisor: "AI Business Advisor",
    online: "Online",
    namaste: "Namaste!",
    askGramSaarthi: "Ask GramSaarthi...",
    whatWeOffer: "WHAT WE OFFER",
    everythingBeforeInvest: "Everything you need before you invest.",
    aiBusinessMatching: "AI Business Matching",
    aiBusinessMatchingDesc:
      "Find businesses that match your capital, skills, resources and local opportunities.",
    localMarketAnalysis: "Local Market Analysis",
    localMarketAnalysisDesc:
      "Understand demand, competition and market opportunities around your village.",
    businessSimulatorDesc:
      "Test different prices, customers and expenses before putting your money at risk.",
    smartFinancialPlanningDesc:
      "Understand your project cost, potential financing and repayment plan.",
    howItWorksTitle: "HOW IT WORKS",
    fourSteps: "From idea to action in 4 simple steps.",
    tellUsAboutYou: "Tell us about you",
    tellUsAboutYouDesc:
      "Share your location, capital, skills and resources.",
    discoverOpportunities: "Discover opportunities",
    discoverOpportunitiesDesc:
      "Our system analyzes suitable local business opportunities.",
    testYourIdea: "Test your idea",
    testYourIdeaDesc:
      "Simulate profits, risks and different business situations.",
    planWithConfidence: "Plan with confidence",
    planWithConfidenceDesc:
      "Get your personalized business and financial roadmap.",
    footerText:
      "Empowering smarter entrepreneurship at the grassroots.",

    dairyBusiness: "Dairy Business",
    groceryStore: "Grocery Store",
    tailoringBusiness: "Tailoring Business",
    poultryBusiness: "Poultry Business",
    foodProcessing: "Food Processing",
    smallGroceryStore: "Small Grocery Store",

    dairyReason:
      "Dairy has strong potential when local demand and resources are available.",
    groceryReason:
      "A grocery business can benefit from regular local household demand.",
    tailoringReason:
      "Tailoring can be started with relatively lower initial investment and skill-based work.",
    poultryReason:
      "Poultry can offer good local demand but requires careful cost and health management.",
    foodProcessingReason:
      "Local food processing can create value from agricultural products and serve nearby markets.",
    smallGroceryReason:
      "A small grocery business can serve recurring everyday needs in the local community.",

    microFinance: "Micro Finance",
    termLoan: "Term Loan",

    aiAnalysisFailed: "AI analysis failed. Please try again.",
    backendError:
      "Could not connect to GramSaarthi AI. Please make sure the backend is running.",
    aiReportError:
      "AI report could not be displayed. Please try the analysis again.",
    finalRecommendationTitle: "Final Recommendation",
    finalDecisionRecommended: "Recommended",
    finalDecisionNotRecommended: "Not Recommended",
    investment: "Investment",
    expectedProfit: "Expected Profit",
    mainRisks: "Main Risks",
    nextSteps: "Next Steps",
    bankReadyReportTitle: "Bank Ready Report",
    actionPlanTitle: "Your Personalized Action Plan",
    actionPlanBasedOn: "Plan based on",
    actionPlanImmediate: "Immediate",
    actionPlanPreparation: "Preparation",
    actionPlanLaunch: "Launch",
    actionPlanMonitor: "First monitoring",
    actionPlanNoData: "No specific action plan was provided by the AI. Use the checklist below to get started.",
    actionPlanListen: "Listen to plan summary",
    governmentSupportTitle: "Government & Funding Support",
    governmentSupportSubtitle: "Potential support areas you may explore",
    fundingCategory: "Support area",
    supportWhyRelevant: "Why it may be relevant",
    supportWhatToCheck: "What to check",
    supportEligibility: "Eligibility note",
    supportFinancing: "Business Financing",
    supportTraining: "Entrepreneurship & Skill Support",
    supportAgriculture: "Agriculture / Allied Support",
    supportEquipment: "Equipment & Infrastructure Support",
    supportMarketAccess: "Market & Digital Support",
    supportLocalBusiness: "Local business & registration",
    supportVerifyOfficial: "Government schemes and eligibility change frequently. Verify current details through official government or financial institution sources before applying.",
    governmentSupportNoData: "No specific government support information was provided by the AI. Below are potential areas to explore.",
    finalRecommendationTitle: "Final Recommendation",
    finalDecisionRecommended: "Recommended",
    finalDecisionNotRecommended: "Not Recommended",
    investment: "Investment",
    expectedProfit: "Expected Profit",
    mainRisks: "Main Risks",
    nextSteps: "Next Steps",
    bankReadyReportTitle: "Bank Ready Report",
  },

  Gujarati: {
    step1: "પગલું 1 / 3",
    assessment: "વ્યવસાય મૂલ્યાંકન",
    tellSituation: "તમારી પરિસ્થિતિ વિશે જણાવો.",
    assessmentDesc:
      "તમારા સંસાધનો અને સ્થાનિક બજાર સાથે મેળ ખાતી વ્યવસાયની તકો શોધવા માટે અમે આ માહિતીનો ઉપયોગ કરીશું.",
    location: "તમે વ્યવસાય ક્યાં શરૂ કરવા માંગો છો?",
    locationPlaceholder: "ગામ / શહેર દાખલ કરો",
    capital: "તમારી પાસે કેટલી પોતાની મૂડી છે?",
    capitalPlaceholder: "ઉદાહરણ: ₹80,000",
    language: "તમારી ભાષા પસંદ કરો",
    skills: "તમારી પાસે કઈ કુશળતા અથવા અનુભવ છે?",
    skillsPlaceholder: "ઉદાહરણ: ખેતી, દરજીકામ, રસોઈ...",
    resources: "તમારી પાસે પહેલેથી કયા સંસાધનો છે?",
    resourcesPlaceholder: "ઉદાહરણ: જમીન, દુકાન, પશુધન...",
    businessIdea: "શું તમારી પાસે પહેલેથી વ્યવસાયનો વિચાર છે?",
    selectBusiness: "વ્યવસાય પસંદ કરો",
    continue: "આગળ વધો",

    assessmentComplete: "મૂલ્યાંકન પૂર્ણ",
    businessMatch: "તમારા વ્યવસાયનો મેળ",
    found: "અમે આ શોધ્યું છે.",
    matchDesc:
      "તમારી માહિતીના આધારે, આ વ્યવસાયો તમારી પરિસ્થિતિ માટે યોગ્ય હોઈ શકે છે.",
    recommended: "#1 ભલામણ",
    matchScore: "મેળ સ્કોર",
    marketReach: "બજાર પહોંચ",
    primaryCustomers: "મુખ્ય ગ્રાહકો",
    distributionChannels: "વિતરણ માધ્યમો",
    opportunity: "તકનું વિશ્લેષણ",
    swot: "SWOT વિશ્લેષણ",
    localDemand: "સ્થાનિક માંગ",
    capitalFit: "મૂડીની યોગ્યતા",
    resourceFit: "સંસાધનોની યોગ્યતા",
    risk: "જોખમ",
    exploreBusiness: "વ્યવસાયનું અન્વેષણ કરો",
    strengths: "મજબૂતાઈ",
    weaknesses: "નબળાઈ",
    opportunities: "તકો",
    threats: "જોખમો",
    localThreats: "સ્થાનિક જોખમો",
    competitors: "સ્પર્ધક વિશ્લેષણ",
    mainCompetitors: "મુખ્ય સ્પર્ધકો",
    competitiveAdvantage: "તમારી સ્પર્ધાત્મક વિશેષતા",
    pricing: "કિંમત વ્યૂહરચના",
    strategy: "વ્યૂહરચના:",
    suggestedPricing: "સૂચવેલ કિંમત:",
    why: "શા માટે:",
    recommendation: "GramSaarthi ભલામણ",
    recommendedSteps: "ભલામણ કરેલા પગલાં",

    marketAnalysis: "બજાર વિશ્લેષણ",
    hyperLocalMarket: "સ્થાનિક બજાર વિશ્લેષણ",
    understandMarket: "તમારા સ્થાનિક બજારને સમજો.",
    marketDesc:
      "તમારા પસંદ કરેલા સ્થાનની આસપાસની તકોનું આ એક ડેમો વિશ્લેષણ છે.",
    yourVillage: "તમારું ગામ",
    localMarketArea: "સ્થાનિક બજાર વિસ્તાર",
    estimatedDemand: "અંદાજિત માંગ",
    high: "ઉચ્ચ",
    competition: "સ્પર્ધા",
    medium: "મધ્યમ",
    growthPotential: "વિકાસની સંભાવના",
    strong: "મજબૂત",
    seasonalDemand: "મોસમી માંગ",
    whenDemandHighest: "માંગ સૌથી વધુ ક્યારે હોય છે?",
    demoData: "ડેમો ડેટા",
    summer: "ઉનાળો",
    monsoon: "ચોમાસું",
    winter: "શિયાળો",
    festival: "તહેવાર",
    competitorMap: "સ્પર્ધાત્મક નકશો",
    nearbyBusinessActivity: "નજીકની વ્યવસાયિક પ્રવૃત્તિ",
    illustrative: "દૃષ્ટાંતરૂપ",
    localMarketRadius: "5–10 કિમી સ્થાનિક બજાર",
    yourLocation: "તમારું સ્થાન",
    mapNote:
      "આ પ્રોટોટાઇપમાં દૃષ્ટાંતરૂપ ડેટાનો ઉપયોગ કરવામાં આવ્યો છે. વાસ્તવિક સ્પર્ધક અને બજાર ડેટા પછીથી API દ્વારા જોડાઈ શકે છે.",
    analyzeRisks: "વ્યવસાયના જોખમોનું વિશ્લેષણ કરો",

    riskAnalysis: "જોખમ વિશ્લેષણ",
    aiRiskAnalysis: "AI જોખમ વિશ્લેષણ",
    knowRisks: "રોકાણ કરતા પહેલા જોખમો જાણો.",
    riskDesc:
      "તમારા પસંદ કરેલા વ્યવસાય સાથે સંકળાયેલા મુખ્ય જોખમો અને તેમને સંચાલિત કરવાની રીતો સમજો.",
    overallRisk: "એકંદર વ્યવસાયિક જોખમ",
    manageablePlanning: "સાવચેત આયોજનથી આ જોખમનું સંચાલન કરી શકાય છે.",
    marketRisk: "બજારનું જોખમ",
    changingDemand: "સ્થાનિક માંગમાં ફેરફાર",
    marketRiskDesc:
      "મોસમ, કિંમતો અને સ્થાનિક સ્પર્ધા અનુસાર ગ્રાહકોની માંગ બદલાઈ શકે છે.",
    financialRisk: "નાણાકીય જોખમ",
    initialInvestment: "પ્રારંભિક રોકાણ",
    financialRiskDesc:
      "વ્યવસાય શરૂ કરતી વખતે અને વધારતી વખતે પૂરતી કાર્યકારી મૂડી રાખો.",
    seasonalRisk: "મોસમી જોખમ",
    seasonDependentSales: "મોસમ આધારિત વેચાણ",
    seasonalRiskDesc:
      "કેટલાક વ્યવસાયોમાં અલગ-અલગ મોસમ દરમિયાન માંગમાં ફેરફાર થઈ શકે છે.",
    low: "ઓછું",
    aiSwot: "AI SWOT વિશ્લેષણ",
    businessAtGlance: "તમારા વ્યવસાયની એક ઝલક",
    strongLocalDemand: "મજબૂત સ્થાનિક માંગ",
    repeatCustomers: "પુનરાવર્તિત ગ્રાહકોની સંભાવના",
    manageableScale: "નાના સ્તરે શરૂ કરી શકાય છે",
    limitedResources: "મર્યાદિત સંસાધનો",
    consistentQuality: "સતત ગુણવત્તા જાળવવાની જરૂર",
    limitedMarketReach: "પ્રારંભિક બજાર પહોંચ મર્યાદિત",
    growingLocalDemand: "વધતી સ્થાનિક માંગ",
    digitalMarketing: "ડિજિટલ માર્કેટિંગની તકો",
    governmentSupport: "સરકારી સહાયની તકો",
    newCompetitors: "નવા સ્પર્ધકો",
    priceFluctuations: "કિંમતમાં ફેરફાર",
    seasonalChanges: "મોસમી ફેરફારો",
    trySimulator: "વ્યવસાય સિમ્યુલેટર અજમાવો",

    businessSimulator: "વ્યવસાય સિમ્યુલેટર",
    whatIfSimulator: "વ્યવસાય સિમ્યુલેટર",
    testIdea: "રોકાણ કરતા પહેલા તમારા વિચારનું પરીક્ષણ કરો.",
    simulatorDesc:
      "નીચેના આંકડા બદલો અને તમારા અંદાજિત વ્યવસાયિક પ્રદર્શનને જુઓ.",
    initialInvestment: "પ્રારંભિક રોકાણ",
    customersPerDay: "દરરોજ ગ્રાહકો",
    averagePrice: "દરેક ગ્રાહક દીઠ સરેરાશ કિંમત",
    monthlyExpenses: "માસિક ખર્ચ",
    monthlyRevenue: "માસિક આવક",
    monthlyProfit: "માસિક નફો",
    yearlyProfit: "વાર્ષિક નફો",
    gramSaarthiInsight: "GramSaarthi માહિતી",
    simulatorNote:
      "આ તમારી ધારણાઓ પર આધારિત પ્રોટોટાઇપ અંદાજ છે. વાસ્તવિક પરિણામો સ્થાનિક માંગ, કિંમત, સંચાલન ખર્ચ અને અન્ય વ્યવસાયિક પરિસ્થિતિઓ અનુસાર બદલાઈ શકે છે.",
    planFinances: "તમારી નાણાકીય યોજના બનાવો",

    financialPlanner: "નાણાકીય આયોજનકાર",
    smartFinancialPlanning: "સ્માર્ટ નાણાકીય આયોજન",
    planFunding: "લોન લેતા પહેલા તમારા ભંડોળનું આયોજન કરો.",
    financeDesc:
      "તમારા અંદાજિત રોકાણ, પોતાના યોગદાન અને સંભવિત નાણાકીય જરૂરિયાતને સમજો.",
    estimatedProjectCost: "અંદાજિત પ્રોજેક્ટ ખર્ચ",
    yourContribution: "તમારું યોગદાન",
    estimatedFundingGap: "અંદાજિત ભંડોળની ખોટ",
    loanPreview: "લોનની ઝલક",
    possibleRepayment: "સંભવિત ચુકવણી પરિસ્થિતિ",
    loanAmount: "લોનની રકમ",
    interestRate: "વ્યાજ દર",
    tenure: "અવધિ",
    scheme: "યોજના",
    moratorium: "મોરેટોરિયમ",
    estimatedEmi: "અંદાજિત EMI",
    repaymentRoadmap: "ચુકવણીનો માર્ગ",
    repaymentJourney: "તમારી અંદાજિત ચુકવણીની સફર",
    initialMoratorium: "પ્રારંભિક મોરેટોરિયમ",
    repaymentPeriod: "ચુકવણી સમયગાળો",
    monthlyEmi: "માસિક EMI",
    annualEmi: "વાર્ષિક EMI",
    illustrative: "દૃષ્ટાંતરૂપ",
    schemeNote:
      "આ એક દૃષ્ટાંતરૂપ ચુકવણી અંદાજ છે. વાસ્તવિક લોનની શરતો, વ્યાજ, સબસિડી અને મોરેટોરિયમ લોનદાતા અને લાગુ યોજનાની પાત્રતા પર આધારિત છે.",
    downloadReport: "સંપૂર્ણ રિપોર્ટ ડાઉનલોડ કરો",
    supportOpportunities: "સહાયની તકો",
    exploreSupport: "સંભવિત સહાય યોજનાઓ શોધો",
    governmentBankSupport: "સરકાર / બેંક સહાય",
    supportDesc:
      "તમારા સ્થાન, વ્યવસાયના પ્રકાર અને પાત્રતાના આધારે તમે સરકારી યોજનાઓ, સબસિડી અથવા ઔપચારિક ક્રેડિટ કાર્યક્રમો શોધી શકો છો.",
    explore: "જુઓ",
    supportNote:
      "યોજનાની પાત્રતા અને ઉપલબ્ધતા હંમેશા સત્તાવાર સરકારી અથવા બેંકિંગ સ્ત્રોતો દ્વારા ચકાસવી જોઈએ.",
    gramSaarthiRecommendation: "GramSaarthi ભલામણ",
    financeAdvice:
      "સૌથી વ્યવહારુ નાના રોકાણથી શરૂઆત કરો, ઇમરજન્સી કાર્યકારી મૂડી રાખો અને લોન લેતા પહેલા નાણાકીય વિકલ્પોની તુલના કરો.",
    generateRoadmap: "મારો વ્યવસાય માર્ગ બનાવો",

    yourBusinessRoadmap: "તમારો વ્યવસાય માર્ગ",
    personalizedRoadmap: "વ્યક્તિગત વ્યવસાય માર્ગ",
    pathIdeaAction: "વિચારથી કાર્ય સુધીનો તમારો માર્ગ.",
    roadmapDesc: "તમે આપેલી માહિતીના આધારે અહીં એક સરળ શરૂઆતની યોજના છે.",
    recommendedBusiness: "ભલામણ કરેલો વ્યવસાય",
    startingPoint: "તમારી શરૂઆતની સ્થિતિ",
    notSpecified: "ઉલ્લેખિત નથી",
    actionPlan: "30 દિવસની કાર્ય યોજના",
    startSmall: "નાની શરૂઆત કરો. શીખો. પછી વધારો.",
    validateDemand: "સ્થાનિક માંગ ચકાસો",
    validateDemandDesc:
      "મોટો ખર્ચ કરતા પહેલા સંભવિત ગ્રાહકો સાથે વાત કરો અને તેમને ખરેખર શું જોઈએ છે તે સમજો.",
    smallPilot: "નાના પાયે શરૂઆત કરો",
    smallPilotDesc:
      "તમારા ઉત્પાદન અથવા સેવાનું વ્યવહારુ સ્તરે પરીક્ષણ કરો અને ખર્ચ તથા વેચાણ નોંધો.",
    trackNumbers: "તમારા આંકડા નોંધો",
    trackNumbersDesc:
      "માત્ર ધારણાઓ પર આધાર રાખવાને બદલે ગ્રાહકો, આવક, ખર્ચ અને માસિક નફાનું નિરીક્ષણ કરો.",
    scaleCarefully: "સાવચેતીપૂર્વક વધારો",
    scaleCarefullyDesc:
      "નફો ફરીથી રોકાણ કરો અને વ્યવસાયમાં સતત માંગ દેખાય પછી જ વધારાના નાણાં વિશે વિચારો.",
    estimatedMonthlyRevenue: "અંદાજિત માસિક આવક",
    estimatedMonthlyProfit: "અંદાજિત માસિક નફો",
    businessRisk: "વ્યવસાયનું જોખમ",
    finalAdvice: "GramSaarthi ની અંતિમ સલાહ",
    finalAdviceDesc:
      "સૌથી મોટું શક્ય રોકાણ કરીને શરૂઆત ન કરો. વ્યવહારુ પાયલોટથી શરૂઆત કરો, માંગ ચકાસો, ખર્ચ નિયંત્રિત કરો અને તમારા આંકડા યોગ્ય હોય ત્યારે વિકાસ કરો.",
    backToGramSaarthi: "GramSaarthi પર પાછા જાઓ",

    features: "સુવિધાઓ",
    howItWorks: "આ કેવી રીતે કામ કરે છે",
    startAssessment: "મૂલ્યાંકન શરૂ કરો",
    aiPoweredAdvisor: "AI આધારિત ગ્રામ્ય વ્યવસાય સલાહકાર",
    smarterBusiness: "તમારા વિચારને વધુ સ્માર્ટ વ્યવસાયમાં ફેરવો.",
    heroDesc:
      "GramSaarthi AI ગ્રામ્ય ઉદ્યોગસાહસિકોને યોગ્ય વ્યવસાય શોધવામાં, સ્થાનિક બજાર સમજવામાં, જોખમો સંચાલિત કરવામાં અને લોન લેતા પહેલા નાણાકીય આયોજન કરવામાં મદદ કરે છે.",
    startBusinessAssessment: "વ્યવસાય મૂલ્યાંકન શરૂ કરો",
    exploreFeatures: "સુવિધાઓ જુઓ",
    simpleToUse: "વાપરવામાં સરળ",
    localInsights: "સ્થાનિક માહિતી",
    smartFinancialPlanning: "સ્માર્ટ નાણાકીય આયોજન",
    aiBusinessAdvisor: "AI વ્યવસાય સલાહકાર",
    online: "ઓનલાઇન",
    namaste: "નમસ્તે!",
    askGramSaarthi: "GramSaarthi ને પૂછો...",
    whatWeOffer: "અમે શું આપીએ છીએ",
    everythingBeforeInvest: "રોકાણ કરતા પહેલા જરૂરી બધું.",
    aiBusinessMatching: "AI વ્યવસાય મેળ",
    aiBusinessMatchingDesc:
      "તમારી મૂડી, કુશળતા, સંસાધનો અને સ્થાનિક તકો સાથે મેળ ખાતા વ્યવસાયો શોધો.",
    localMarketAnalysis: "સ્થાનિક બજાર વિશ્લેષણ",
    localMarketAnalysisDesc:
      "તમારા ગામની આસપાસની માંગ, સ્પર્ધા અને બજારની તકો સમજો.",
    businessSimulatorDesc:
      "પૈસા રોકતા પહેલા અલગ કિંમતો, ગ્રાહકો અને ખર્ચનું પરીક્ષણ કરો.",
    smartFinancialPlanningDesc:
      "તમારો પ્રોજેક્ટ ખર્ચ, સંભવિત નાણાકીય સહાય અને ચુકવણી યોજના સમજો.",
    howItWorksTitle: "આ કેવી રીતે કામ કરે છે",
    fourSteps: "વિચારથી કાર્ય સુધીના 4 સરળ પગલાં.",
    tellUsAboutYou: "તમારા વિશે જણાવો",
    tellUsAboutYouDesc:
      "તમારું સ્થાન, મૂડી, કુશળતા અને સંસાધનો શેર કરો.",
    discoverOpportunities: "તકો શોધો",
    discoverOpportunitiesDesc:
      "અમારી સિસ્ટમ યોગ્ય સ્થાનિક વ્યવસાયિક તકોનું વિશ્લેષણ કરે છે.",
    testYourIdea: "તમારા વિચારનું પરીક્ષણ કરો",
    testYourIdeaDesc:
      "નફો, જોખમો અને વિવિધ વ્યવસાયિક પરિસ્થિતિઓનું સિમ્યુલેશન કરો.",
    planWithConfidence: "આત્મવિશ્વાસ સાથે આયોજન કરો",
    planWithConfidenceDesc:
      "તમારો વ્યક્તિગત વ્યવસાય અને નાણાકીય માર્ગ મેળવો.",
    footerText:
      "ગ્રામ્ય સ્તરે વધુ સ્માર્ટ ઉદ્યોગસાહસિકતાને સશક્ત બનાવવું.",

    dairyBusiness: "ડેરી વ્યવસાય",
    groceryStore: "કિરાણા દુકાન",
    tailoringBusiness: "દરજીકામ વ્યવસાય",
    poultryBusiness: "પોલ્ટ્રી વ્યવસાય",
    foodProcessing: "ખાદ્ય પ્રક્રિયા",
    smallGroceryStore: "નાની કિરાણા દુકાન",
    dairyReason:
      "સ્થાનિક માંગ અને સંસાધનો ઉપલબ્ધ હોય ત્યારે ડેરીમાં સારી સંભાવના છે.",
    groceryReason:
      "કિરાણા વ્યવસાયને સ્થાનિક ઘરોની નિયમિત માંગથી લાભ મળી શકે છે.",
    tailoringReason:
      "દરજીકામ ઓછા પ્રારંભિક રોકાણ અને કુશળતા આધારિત કાર્યથી શરૂ કરી શકાય છે.",
    poultryReason:
      "પોલ્ટ્રીમાં સારી સ્થાનિક માંગ હોઈ શકે છે, પરંતુ ખર્ચ અને આરોગ્યનું સાવચેતીપૂર્વક સંચાલન જરૂરી છે.",
    foodProcessingReason:
      "સ્થાનિક ખાદ્ય પ્રક્રિયા કૃષિ ઉત્પાદનોમાંથી મૂલ્ય ઊભું કરી શકે છે અને નજીકના બજારોને સેવા આપી શકે છે.",
    smallGroceryReason:
      "નાની કિરાણા દુકાન સ્થાનિક સમુદાયની રોજિંદી જરૂરિયાતો પૂરી કરી શકે છે.",
    microFinance: "માઇક્રો ફાઇનાન્સ",
    termLoan: "ટર્મ લોન",
    aiAnalysisFailed: "AI વિશ્લેષણ નિષ્ફળ ગયું. કૃપા કરીને ફરી પ્રયાસ કરો.",
    backendError:
      "GramSaarthi AI સાથે જોડાઈ શકાયું નથી. કૃપા કરીને ખાતરી કરો કે backend ચાલુ છે.",
    aiReportError:
      "AI રિપોર્ટ બતાવી શકાયો નથી. કૃપા કરીને ફરી વિશ્લેષણ કરો.",
  },

  Hindi: {
    step1: "चरण 1 / 3",
    assessment: "व्यवसाय मूल्यांकन",
    tellSituation: "अपनी स्थिति के बारे में बताएं।",
    assessmentDesc:
      "आपके संसाधनों और स्थानीय बाजार से मेल खाने वाले व्यवसाय के अवसर खोजने के लिए हम इस जानकारी का उपयोग करेंगे।",
    location: "आप व्यवसाय कहाँ शुरू करना चाहते हैं?",
    locationPlaceholder: "गाँव / शहर दर्ज करें",
    capital: "आपके पास कितनी अपनी पूंजी है?",
    capitalPlaceholder: "उदाहरण: ₹80,000",
    language: "अपनी भाषा चुनें",
    skills: "आपके पास कौन-से कौशल या अनुभव हैं?",
    skillsPlaceholder: "उदाहरण: खेती, सिलाई, खाना बनाना...",
    resources: "आपके पास पहले से कौन-से संसाधन हैं?",
    resourcesPlaceholder: "उदाहरण: जमीन, दुकान, पशुधन...",
    businessIdea: "क्या आपके पास पहले से कोई व्यवसाय का विचार है?",
    selectBusiness: "व्यवसाय चुनें",
    continue: "आगे बढ़ें",

    assessmentComplete: "मूल्यांकन पूरा हुआ",
    businessMatch: "आपके व्यवसाय का मिलान",
    found: "हमें यह मिला है।",
    matchDesc:
      "आपकी जानकारी के आधार पर, ये व्यवसाय आपकी स्थिति के लिए अच्छे विकल्प हो सकते हैं।",
    recommended: "#1 अनुशंसित",
    matchScore: "मिलान स्कोर",
    marketReach: "बाजार पहुंच",
    primaryCustomers: "मुख्य ग्राहक",
    distributionChannels: "वितरण माध्यम",
    opportunity: "अवसर विश्लेषण",
    swot: "SWOT विश्लेषण",
    localDemand: "स्थानीय मांग",
    capitalFit: "पूंजी की उपयुक्तता",
    resourceFit: "संसाधनों की उपयुक्तता",
    risk: "जोखिम",
    exploreBusiness: "व्यवसाय देखें",
    strengths: "मजबूतियाँ",
    weaknesses: "कमजोरियाँ",
    opportunities: "अवसर",
    threats: "खतरे",
    localThreats: "स्थानीय खतरे",
    competitors: "प्रतिस्पर्धी विश्लेषण",
    mainCompetitors: "मुख्य प्रतिस्पर्धी",
    competitiveAdvantage: "आपकी प्रतिस्पर्धात्मक विशेषता",
    pricing: "मूल्य निर्धारण रणनीति",
    strategy: "रणनीति:",
    suggestedPricing: "सुझाई गई कीमत:",
    why: "क्यों:",
    recommendation: "GramSaarthi की अनुशंसा",
    recommendedSteps: "अनुशंसित कदम",

    marketAnalysis: "बाज़ार विश्लेषण",
    hyperLocalMarket: "स्थानीय बाज़ार विश्लेषण",
    understandMarket: "अपने स्थानीय बाज़ार को समझें।",
    marketDesc:
      "आपके चुने हुए स्थान के आसपास के अवसरों का यह एक डेमो विश्लेषण है।",
    yourVillage: "आपका गाँव",
    localMarketArea: "स्थानीय बाज़ार क्षेत्र",
    estimatedDemand: "अनुमानित मांग",
    high: "उच्च",
    competition: "प्रतिस्पर्धा",
    medium: "मध्यम",
    growthPotential: "विकास की संभावना",
    strong: "मज़बूत",
    seasonalDemand: "मौसमी मांग",
    whenDemandHighest: "मांग सबसे अधिक कब होती है?",
    demoData: "डेमो डेटा",
    summer: "गर्मी",
    monsoon: "मानसून",
    winter: "सर्दी",
    festival: "त्योहार",
    competitorMap: "प्रतिस्पर्धी मानचित्र",
    nearbyBusinessActivity: "आस-पास की व्यावसायिक गतिविधि",
    illustrative: "उदाहरणात्मक",
    localMarketRadius: "5–10 किमी स्थानीय बाज़ार",
    yourLocation: "आपका स्थान",
    mapNote:
      "इस प्रोटोटाइप में उदाहरणात्मक डेटा का उपयोग किया गया है। वास्तविक प्रतिस्पर्धी और बाज़ार डेटा बाद में API के माध्यम से जोड़ा जा सकता है।",
    analyzeRisks: "व्यवसाय के जोखिमों का विश्लेषण करें",

    riskAnalysis: "जोखिम विश्लेषण",
    aiRiskAnalysis: "AI जोखिम विश्लेषण",
    knowRisks: "निवेश करने से पहले जोखिम जानें।",
    riskDesc:
      "अपने चुने हुए व्यवसाय से जुड़े मुख्य जोखिमों और उन्हें प्रबंधित करने के तरीकों को समझें।",
    overallRisk: "कुल व्यवसायिक जोखिम",
    manageablePlanning:
      "सावधानीपूर्वक योजना बनाकर इस जोखिम स्तर को संभाला जा सकता है।",
    marketRisk: "बाजार जोखिम",
    changingDemand: "बदलती स्थानीय मांग",
    marketRiskDesc:
      "मौसम, कीमतों और स्थानीय प्रतिस्पर्धा के कारण ग्राहक मांग बदल सकती है।",
    financialRisk: "वित्तीय जोखिम",
    initialInvestment: "प्रारंभिक निवेश",
    financialRiskDesc:
      "व्यवसाय शुरू और बढ़ाते समय पर्याप्त कार्यशील पूंजी रखें।",
    seasonalRisk: "मौसमी जोखिम",
    seasonDependentSales: "मौसम पर निर्भर बिक्री",
    seasonalRiskDesc:
      "कुछ व्यवसायों में अलग-अलग मौसमों के दौरान मांग बदल सकती है।",
    low: "कम",
    aiSwot: "AI SWOT विश्लेषण",
    businessAtGlance: "आपके व्यवसाय की एक झलक",
    strongLocalDemand: "मजबूत स्थानीय मांग",
    repeatCustomers: "बार-बार आने वाले ग्राहकों की संभावना",
    manageableScale: "छोटे स्तर पर शुरू किया जा सकता है",
    limitedResources: "सीमित संसाधन",
    consistentQuality: "लगातार गुणवत्ता बनाए रखने की आवश्यकता",
    limitedMarketReach: "शुरुआती बाजार पहुंच सीमित",
    growingLocalDemand: "बढ़ती स्थानीय मांग",
    digitalMarketing: "डिजिटल मार्केटिंग के अवसर",
    governmentSupport: "सरकारी सहायता के अवसर",
    newCompetitors: "नए प्रतिस्पर्धी",
    priceFluctuations: "कीमतों में उतार-चढ़ाव",
    seasonalChanges: "मौसमी बदलाव",
    trySimulator: "बिजनेस सिम्युलेटर आज़माएं",

    businessSimulator: "बिजनेस सिम्युलेटर",
    whatIfSimulator: "बिजनेस सिम्युलेटर",
    testIdea: "निवेश करने से पहले अपने विचार का परीक्षण करें।",
    simulatorDesc:
      "नीचे दिए गए आंकड़े बदलें और देखें कि आपके अनुमानित व्यवसाय प्रदर्शन में कैसे बदलाव आता है।",
    initialInvestment: "प्रारंभिक निवेश",
    customersPerDay: "प्रतिदिन ग्राहक",
    averagePrice: "प्रति ग्राहक औसत कीमत",
    monthlyExpenses: "मासिक खर्च",
    monthlyRevenue: "मासिक राजस्व",
    monthlyProfit: "मासिक लाभ",
    yearlyProfit: "वार्षिक लाभ",
    gramSaarthiInsight: "GramSaarthi जानकारी",
    simulatorNote:
      "यह आपकी धारणाओं पर आधारित एक प्रोटोटाइप अनुमान है। वास्तविक परिणाम स्थानीय मांग, कीमत, संचालन लागत और अन्य व्यावसायिक परिस्थितियों के आधार पर अलग हो सकते हैं।",
    planFinances: "अपनी वित्तीय योजना बनाएं",

    financialPlanner: "वित्तीय योजनाकार",
    smartFinancialPlanning: "स्मार्ट वित्तीय योजना",
    planFunding: "उधार लेने से पहले अपने वित्त की योजना बनाएं।",
    financeDesc:
      "अपने अनुमानित निवेश, स्वयं के योगदान और संभावित वित्तीय आवश्यकता को समझें।",
    estimatedProjectCost: "अनुमानित परियोजना लागत",
    yourContribution: "आपका योगदान",
    estimatedFundingGap: "अनुमानित वित्तीय अंतर",
    loanPreview: "लोन पूर्वावलोकन",
    possibleRepayment: "संभावित भुगतान परिदृश्य",
    loanAmount: "लोन राशि",
    interestRate: "ब्याज दर",
    tenure: "अवधि",
    scheme: "योजना",
    moratorium: "मोराटोरियम",
    estimatedEmi: "अनुमानित EMI",
    repaymentRoadmap: "भुगतान रोडमैप",
    repaymentJourney: "आपकी अनुमानित भुगतान यात्रा",
    initialMoratorium: "प्रारंभिक मोराटोरियम",
    repaymentPeriod: "भुगतान अवधि",
    monthlyEmi: "मासिक EMI",
    annualEmi: "वार्षिक EMI",
    illustrative: "उदाहरणात्मक",
    schemeNote:
      "यह एक उदाहरणात्मक भुगतान अनुमान है। वास्तविक लोन शर्तें, ब्याज, सब्सिडी और मोराटोरियम ऋणदाता तथा लागू योजना की पात्रता पर निर्भर करते हैं।",
    downloadReport: "पूरी रिपोर्ट डाउनलोड करें",
    downloadCompleteReport: "पूरी रिपोर्ट डाउनलोड करें",
    listen: "सुनें",
    audioLoading: "ऑडियो तैयार किया जा रहा है...",
    audioNotSupported: "इस ब्राउज़र में वॉइस आउटपुट समर्थित नहीं है।",
    audioError: "जनरेट किया गया ऑडियो नहीं चल सकता।",
    supportOpportunities: "सहायता के अवसर",
    exploreSupport: "संभावित सहायता योजनाएं देखें",
    governmentBankSupport: "सरकारी / बैंक सहायता",
    supportDesc:
      "आपके स्थान, व्यवसाय के प्रकार और पात्रता के आधार पर आप सरकारी योजनाओं, सब्सिडी या औपचारिक क्रेडिट कार्यक्रमों को देख सकते हैं।",
    explore: "देखें",
    supportNote:
      "योजना की पात्रता और उपलब्धता हमेशा आधिकारिक सरकारी या बैंकिंग स्रोतों से सत्यापित करनी चाहिए।",
    gramSaarthiRecommendation: "GramSaarthi की अनुशंसा",
    financeAdvice:
      "सबसे छोटे व्यावहारिक निवेश से शुरुआत करें, आपातकालीन कार्यशील पूंजी रखें और लोन लेने से पहले वित्तीय विकल्पों की तुलना करें।",
    generateRoadmap: "मेरा बिजनेस रोडमैप बनाएं",

    yourBusinessRoadmap: "आपका बिजनेस रोडमैप",
    personalizedRoadmap: "व्यक्तिगत रोडमैप",
    pathIdeaAction: "विचार से कार्य तक आपका रास्ता।",
    roadmapDesc:
      "आपके द्वारा दी गई जानकारी के आधार पर यह एक सरल शुरुआती योजना है।",
    recommendedBusiness: "अनुशंसित व्यवसाय",
    startingPoint: "आपकी शुरुआती स्थिति",
    notSpecified: "उल्लेखित नहीं",
    actionPlan: "30-दिन की कार्य योजना",
    startSmall: "छोटी शुरुआत करें। सीखें। फिर बढ़ें।",
    validateDemand: "स्थानीय मांग की पुष्टि करें",
    validateDemandDesc:
      "अधिक खर्च करने से पहले संभावित ग्राहकों से बात करें और समझें कि उन्हें वास्तव में क्या चाहिए।",
    smallPilot: "छोटे पायलट से शुरुआत करें",
    smallPilotDesc:
      "अपने उत्पाद या सेवा का छोटे स्तर पर परीक्षण करें और लागत तथा बिक्री दर्ज करें।",
    trackNumbers: "अपने आंकड़े ट्रैक करें",
    trackNumbersDesc:
      "केवल अनुमानों पर निर्भर रहने के बजाय ग्राहकों, राजस्व, खर्च और मासिक लाभ पर नजर रखें।",
    scaleCarefully: "सावधानी से विस्तार करें",
    scaleCarefullyDesc:
      "लाभ को फिर से निवेश करें और व्यवसाय में लगातार मांग दिखने के बाद ही अतिरिक्त वित्तपोषण पर विचार करें।",
    estimatedMonthlyRevenue: "अनुमानित मासिक राजस्व",
    estimatedMonthlyProfit: "अनुमानित मासिक लाभ",
    businessRisk: "व्यवसाय जोखिम",
    finalAdvice: "GramSaarthi की अंतिम सलाह",
    finalAdviceDesc:
      "सबसे बड़े संभव निवेश से शुरुआत न करें। व्यावहारिक पायलट से शुरुआत करें, मांग की पुष्टि करें, लागत नियंत्रित करें और आंकड़े सही होने पर आगे बढ़ें।",
    backToGramSaarthi: "GramSaarthi पर वापस जाएं",

    features: "सुविधाएं",
    howItWorks: "यह कैसे काम करता है",
    startAssessment: "मूल्यांकन शुरू करें",
    aiPoweredAdvisor: "AI-संचालित ग्रामीण व्यवसाय सलाहकार",
    smarterBusiness: "अपने विचार को एक स्मार्ट व्यवसाय में बदलें।",
    heroDesc:
      "GramSaarthi AI ग्रामीण उद्यमियों को सही व्यवसाय खोजने, स्थानीय बाजार समझने, जोखिम प्रबंधित करने और लोन लेने से पहले वित्तीय योजना बनाने में मदद करता है।",
    startBusinessAssessment: "व्यवसाय मूल्यांकन शुरू करें",
    exploreFeatures: "सुविधाएं देखें",
    simpleToUse: "उपयोग में आसान",
    localInsights: "स्थानीय जानकारी",
    smartFinancialPlanning: "स्मार्ट वित्तीय योजना",
    aiBusinessAdvisor: "AI बिजनेस एडवाइजर",
    online: "ऑनलाइन",
    namaste: "नमस्ते!",
    askGramSaarthi: "GramSaarthi से पूछें...",
    whatWeOffer: "हम क्या प्रदान करते हैं",
    everythingBeforeInvest: "निवेश करने से पहले आपको जो कुछ चाहिए।",
    aiBusinessMatching: "AI बिजनेस मैचिंग",
    aiBusinessMatchingDesc:
      "अपनी पूंजी, कौशल, संसाधनों और स्थानीय अवसरों से मेल खाने वाले व्यवसाय खोजें।",
    localMarketAnalysis: "स्थानीय बाजार विश्लेषण",
    localMarketAnalysisDesc:
      "अपने गांव के आसपास की मांग, प्रतिस्पर्धा और बाजार के अवसर समझें।",
    businessSimulatorDesc:
      "पैसा लगाने से पहले अलग-अलग कीमतों, ग्राहकों और खर्चों का परीक्षण करें।",
    smartFinancialPlanningDesc:
      "अपनी परियोजना लागत, संभावित वित्तपोषण और भुगतान योजना समझें।",
    howItWorksTitle: "यह कैसे काम करता है",
    fourSteps: "विचार से कार्य तक 4 सरल कदम।",
    tellUsAboutYou: "अपने बारे में बताएं",
    tellUsAboutYouDesc:
      "अपना स्थान, पूंजी, कौशल और संसाधन साझा करें।",
    discoverOpportunities: "अवसर खोजें",
    discoverOpportunitiesDesc:
      "हमारी प्रणाली उपयुक्त स्थानीय व्यवसाय अवसरों का विश्लेषण करती है।",
    testYourIdea: "अपने विचार का परीक्षण करें",
    testYourIdeaDesc:
      "लाभ, जोखिम और विभिन्न व्यवसायिक परिस्थितियों का सिमुलेशन करें।",
    planWithConfidence: "आत्मविश्वास से योजना बनाएं",
    planWithConfidenceDesc:
      "अपना व्यक्तिगत व्यवसाय और वित्तीय रोडमैप प्राप्त करें।",
    footerText:
      "ग्रामीण स्तर पर बेहतर उद्यमिता को सशक्त बनाना।",

    dairyBusiness: "डेयरी व्यवसाय",
    groceryStore: "किराना स्टोर",
    tailoringBusiness: "सिलाई व्यवसाय",
    poultryBusiness: "पोल्ट्री व्यवसाय",
    foodProcessing: "खाद्य प्रसंस्करण",
    smallGroceryStore: "छोटी किराना दुकान",
    dairyReason:
      "स्थानीय मांग और संसाधन उपलब्ध होने पर डेयरी में अच्छी संभावना है।",
    groceryReason:
      "किराना व्यवसाय को स्थानीय घरों की नियमित मांग से लाभ मिल सकता है।",
    tailoringReason:
      "सिलाई व्यवसाय अपेक्षाकृत कम शुरुआती निवेश और कौशल आधारित काम से शुरू किया जा सकता है।",
    poultryReason:
      "पोल्ट्री में अच्छी स्थानीय मांग हो सकती है, लेकिन लागत और स्वास्थ्य का सावधानीपूर्वक प्रबंधन जरूरी है।",
    foodProcessingReason:
      "स्थानीय खाद्य प्रसंस्करण कृषि उत्पादों से मूल्य बढ़ा सकता है और आसपास के बाजारों की सेवा कर सकता है।",
    smallGroceryReason:
      "छोटी किराना दुकान स्थानीय समुदाय की रोजमर्रा की जरूरतों को पूरा कर सकती है।",
    microFinance: "माइक्रो फाइनेंस",
    termLoan: "टर्म लोन",
    aiAnalysisFailed: "AI विश्लेषण विफल हुआ। कृपया फिर प्रयास करें।",
    backendError:
      "GramSaarthi AI से कनेक्ट नहीं हो सका। कृपया सुनिश्चित करें कि backend चल रहा है।",
    aiReportError:
      "AI रिपोर्ट प्रदर्शित नहीं हो सकी। कृपया फिर से विश्लेषण करें।",
  },

  Marathi: {
    step1: "पायरी 1 / 3",
    assessment: "व्यवसाय मूल्यांकन",
    tellSituation: "तुमच्या परिस्थितीबद्दल सांगा.",
    assessmentDesc:
      "तुमची संसाधने आणि स्थानिक बाजाराशी जुळणाऱ्या व्यवसायाच्या संधी शोधण्यासाठी आम्ही ही माहिती वापरू.",
    location: "तुम्ही व्यवसाय कुठे सुरू करणार आहात?",
    locationPlaceholder: "गाव / शहर लिहा",
    capital: "तुमच्याकडे किती स्वतःची भांडवल आहे?",
    capitalPlaceholder: "उदाहरण: ₹80,000",
    language: "तुमची भाषा निवडा",
    skills: "तुमच्याकडे कोणती कौशल्ये किंवा अनुभव आहेत?",
    skillsPlaceholder: "उदाहरण: शेती, शिवणकाम, स्वयंपाक...",
    resources: "तुमच्याकडे आधीपासून कोणती संसाधने आहेत?",
    resourcesPlaceholder: "उदाहरण: जमीन, दुकान, पशुधन...",
    businessIdea: "तुमच्याकडे आधीपासून व्यवसायाची कल्पना आहे का?",
    selectBusiness: "व्यवसाय निवडा",
    continue: "पुढे जा",

    assessmentComplete: "मूल्यांकन पूर्ण",
    businessMatch: "तुमच्या व्यवसायाचा जुळवणी",
    found: "आम्हाला हे आढळले.",
    matchDesc:
      "तुमच्या माहितीच्या आधारावर हे व्यवसाय तुमच्या परिस्थितीसाठी योग्य असू शकतात.",
    recommended: "#1 शिफारस",
    matchScore: "जुळवणी गुण",
    marketReach: "बाजारपेठेची पोहोच",
    primaryCustomers: "मुख्य ग्राहक",
    distributionChannels: "वितरण माध्यमे",
    opportunity: "संधीचे विश्लेषण",
    swot: "SWOT विश्लेषण",
    localDemand: "स्थानिक मागणी",
    capitalFit: "भांडवलाची योग्यत",
    resourceFit: "संसाधनांची योग्यत",
    risk: "जोखीम",
    exploreBusiness: "व्यवसाय पहा",
    strengths: "सामर्थ्ये",
    weaknesses: "कमकुवतपणा",
    opportunities: "संधी",
    threats: "धोके",
    localThreats: "स्थानिक धोके",
    competitors: "स्पर्धक विश्लेषण",
    mainCompetitors: "मुख्य स्पर्धक",
    competitiveAdvantage: "तुमचा स्पर्धात्मक फायदा",
    pricing: "किंमत धोरण",
    strategy: "धोरण:",
    suggestedPricing: "सुचवलेली किंमत:",
    why: "का:",
    recommendation: "GramSaarthi शिफारस",
    recommendedSteps: "शिफारस केलेली पावले",

    marketAnalysis: "बाजार विश्लेषण",
    hyperLocalMarket: "स्थानिक बाजार विश्लेषण",
    understandMarket: "तुमचा स्थानिक बाजार समजून घ्या.",
    marketDesc:
      "तुम्ही निवडलेल्या ठिकाणाभोवतीच्या संधींचे हे डेमो विश्लेषण आहे.",
    yourVillage: "तुमचे गाव",
    localMarketArea: "स्थानिक बाजार क्षेत्र",
    estimatedDemand: "अंदाजित मागणी",
    high: "जास्त",
    competition: "स्पर्धा",
    medium: "मध्यम",
    growthPotential: "वाढीची क्षमता",
    strong: "मजबूत",
    seasonalDemand: "हंगामी मागणी",
    whenDemandHighest: "मागणी सर्वाधिक कधी असते?",
    demoData: "डेमो डेटा",
    summer: "उन्हाळा",
    monsoon: "पावसाळा",
    winter: "हिवाळा",
    festival: "सण",
    competitorMap: "स्पर्धक नकाशा",
    nearbyBusinessActivity: "जवळील व्यवसायिक हालचाल",
    illustrative: "प्रातिनिधिक",
    localMarketRadius: "5–10 किमी स्थानिक बाजार",
    yourLocation: "तुमचे स्थान",
    mapNote:
      "या प्रोटोटाइपमध्ये प्रातिनिधिक डेटाचा वापर केला आहे. वास्तविक स्पर्धक आणि बाजार डेटा नंतर API द्वारे जोडता येईल.",
    analyzeRisks: "व्यवसायाच्या जोखमींचे विश्लेषण करा",

    riskAnalysis: "जोखीम विश्लेषण",
    aiRiskAnalysis: "AI जोखीम विश्लेषण",
    knowRisks: "गुंतवणूक करण्यापूर्वी जोखीम जाणून घ्या.",
    riskDesc:
      "तुमच्या निवडलेल्या व्यवसायाशी संबंधित प्रमुख जोखीम आणि त्यांचे व्यवस्थापन कसे करावे हे समजा.",
    overallRisk: "एकूण व्यवसाय जोखीम",
    manageablePlanning: "काळजीपूर्वक नियोजनाने ही जोखीम व्यवस्थापित करता येते.",
    marketRisk: "बाजार जोखीम",
    changingDemand: "बदलती स्थानिक मागणी",
    marketRiskDesc:
      "हंगाम, किंमती आणि स्थानिक स्पर्धेनुसार ग्राहकांची मागणी बदलू शकते.",
    financialRisk: "आर्थिक जोखीम",
    initialInvestment: "प्रारंभिक गुंतवणूक",
    financialRiskDesc:
      "व्यवसाय सुरू करताना आणि वाढवताना पुरेशी कार्यकारी भांडवल ठेवा.",
    seasonalRisk: "हंगामी जोखीम",
    seasonDependentSales: "हंगामावर अवलंबून विक्री",
    seasonalRiskDesc:
      "काही व्यवसायांमध्ये वेगवेगळ्या हंगामात मागणी बदलू शकते.",
    low: "कमी",
    aiSwot: "AI SWOT विश्लेषण",
    businessAtGlance: "तुमच्या व्यवसायाची झलक",
    strongLocalDemand: "मजबूत स्थानिक मागणी",
    repeatCustomers: "पुन्हा येणाऱ्या ग्राहकांची शक्यता",
    manageableScale: "लहान प्रमाणात सुरू करता येते",
    limitedResources: "मर्यादित संसाधने",
    consistentQuality: "सातत्यपूर्ण गुणवत्ता राखण्याची गरज",
    limitedMarketReach: "सुरुवातीची बाजारपेठ मर्यादित",
    growingLocalDemand: "वाढती स्थानिक मागणी",
    digitalMarketing: "डिजिटल मार्केटिंगच्या संधी",
    governmentSupport: "सरकारी मदतीच्या संधी",
    newCompetitors: "नवे स्पर्धक",
    priceFluctuations: "किंमतीतील चढ-उतार",
    seasonalChanges: "हंगामी बदल",
    trySimulator: "व्यवसाय सिम्युलेटर वापरा",

    businessSimulator: "व्यवसाय सिम्युलेटर",
    whatIfSimulator: "व्यवसाय सिम्युलेटर",
    testIdea: "गुंतवणूक करण्यापूर्वी तुमच्या कल्पनेची चाचणी घ्या.",
    simulatorDesc:
      "खालील आकडे बदला आणि अंदाजित व्यवसाय कामगिरीतील बदल पहा.",
    initialInvestment: "प्रारंभिक गुंतवणूक",
    customersPerDay: "दररोज ग्राहक",
    averagePrice: "प्रति ग्राहक सरासरी किंमत",
    monthlyExpenses: "मासिक खर्च",
    monthlyRevenue: "मासिक उत्पन्न",
    monthlyProfit: "मासिक नफा",
    yearlyProfit: "वार्षिक नफा",
    gramSaarthiInsight: "GramSaarthi माहिती",
    simulatorNote:
      "हा तुमच्या गृहितकांवर आधारित प्रोटोटाइप अंदाज आहे. वास्तविक परिणाम स्थानिक मागणी, किंमत, संचालन खर्च आणि इतर परिस्थितींनुसार बदलू शकतात.",
    planFinances: "तुमच्या आर्थिक नियोजनाची सुरुवात करा",

    financialPlanner: "आर्थिक नियोजक",
    smartFinancialPlanning: "स्मार्ट आर्थिक नियोजन",
    planFunding: "कर्ज घेण्यापूर्वी तुमच्या निधीचे नियोजन करा.",
    financeDesc:
      "अंदाजित गुंतवणूक, स्वतःचे योगदान आणि संभाव्य आर्थिक गरज समजून घ्या.",
    estimatedProjectCost: "अंदाजित प्रकल्प खर्च",
    yourContribution: "तुमचे योगदान",
    estimatedFundingGap: "अंदाजित निधीची कमतरता",
    loanPreview: "कर्जाचा आढावा",
    possibleRepayment: "संभाव्य परतफेड परिस्थिती",
    loanAmount: "कर्जाची रक्कम",
    interestRate: "व्याजदर",
    tenure: "कालावधी",
    scheme: "योजना",
    moratorium: "मोरॅटोरियम",
    estimatedEmi: "अंदाजित EMI",
    repaymentRoadmap: "परतफेड मार्ग",
    repaymentJourney: "तुमचा अंदाजित परतफेड प्रवास",
    initialMoratorium: "प्रारंभिक मोरॅटोरियम",
    repaymentPeriod: "परतफेड कालावधी",
    monthlyEmi: "मासिक EMI",
    annualEmi: "वार्षिक EMI",
    illustrative: "प्रातिनिधिक",
    schemeNote:
      "हा प्रातिनिधिक परतफेड अंदाज आहे. वास्तविक कर्जाच्या अटी, व्याज, अनुदान आणि मोरॅटोरियम कर्जदाता व योजनेच्या पात्रतेवर अवलंबून असतात.",
    downloadReport: "संपूर्ण अहवाल डाउनलोड करा",
    downloadCompleteReport: "संपूर्ण अहवाल डाउनलोड करा",
    listen: "ऐका",
    audioLoading: "ऑडिओ तयार होत आहे...",
    audioNotSupported: "या ब्राउझरमध्ये वॉइस आउटपुट समर्थित नाही.",
    audioError: "जेनरेट केलेला ऑडिओ चालवता आला नाही.",
    supportOpportunities: "सहाय्याच्या संधी",
    exploreSupport: "संभाव्य सहाय्य योजना पहा",
    governmentBankSupport: "सरकार / बँक सहाय्य",
    supportDesc:
      "तुमचे स्थान, व्यवसायाचा प्रकार आणि पात्रतेनुसार तुम्ही सरकारी योजना, अनुदान किंवा औपचारिक कर्ज कार्यक्रम पाहू शकता.",
    explore: "पहा",
    supportNote:
      "योजनेची पात्रता आणि उपलब्धता अधिकृत सरकारी किंवा बँकिंग स्रोतांद्वारे तपासली पाहिजे.",
    gramSaarthiRecommendation: "GramSaarthi शिफारस",
    financeAdvice:
      "सर्वात व्यवहार्य लहान गुंतवणुकीपासून सुरुवात करा, आपत्कालीन कार्यकारी भांडवल ठेवा आणि कर्ज घेण्यापूर्वी आर्थिक पर्यायांची तुलना करा.",
    generateRoadmap: "माझा व्यवसाय मार्ग तयार करा",

    yourBusinessRoadmap: "तुमचा व्यवसाय मार्ग",
    personalizedRoadmap: "वैयक्तिक व्यवसाय मार्ग",
    pathIdeaAction: "कल्पनेपासून कृतीपर्यंतचा तुमचा मार्ग.",
    roadmapDesc:
      "तुम्ही दिलेल्या माहितीच्या आधारे ही एक सोपी सुरुवातीची योजना आहे.",
    recommendedBusiness: "शिफारस केलेला व्यवसाय",
    startingPoint: "तुमची सुरुवातीची स्थिती",
    notSpecified: "नमूद केलेले नाही",
    actionPlan: "30 दिवसांची कृती योजना",
    startSmall: "लहान सुरुवात करा. शिका. मग वाढवा.",
    validateDemand: "स्थानिक मागणी तपासा",
    validateDemandDesc:
      "मोठा खर्च करण्यापूर्वी संभाव्य ग्राहकांशी बोला आणि त्यांना खरोखर काय हवे आहे ते समजा.",
    smallPilot: "लहान पायलट सुरू करा",
    smallPilotDesc:
      "तुमच्या उत्पादनाची किंवा सेवेची व्यवस्थापनीय प्रमाणात चाचणी घ्या आणि खर्च व विक्री नोंदवा.",
    trackNumbers: "तुमचे आकडे नोंदवा",
    trackNumbersDesc:
      "फक्त अंदाजांवर अवलंबून न राहता ग्राहक, उत्पन्न, खर्च आणि मासिक नफा तपासा.",
    scaleCarefully: "सावधपणे विस्तार करा",
    scaleCarefullyDesc:
      "नफा पुन्हा गुंतवा आणि व्यवसायात सातत्यपूर्ण मागणी दिसल्यानंतरच अतिरिक्त निधीचा विचार करा.",
    estimatedMonthlyRevenue: "अंदाजित मासिक उत्पन्न",
    estimatedMonthlyProfit: "अंदाजित मासिक नफा",
    businessRisk: "व्यवसाय जोखीम",
    finalAdvice: "GramSaarthi चा अंतिम सल्ला",
    finalAdviceDesc:
      "सर्वात मोठ्या गुंतवणुकीपासून सुरुवात करू नका. व्यवहार्य पायलट सुरू करा, मागणी तपासा, खर्च नियंत्रित करा आणि आकडे योग्य असल्यास वाढवा.",
    backToGramSaarthi: "GramSaarthi वर परत जा",

    features: "वैशिष्ट्ये",
    howItWorks: "हे कसे काम करते",
    startAssessment: "मूल्यांकन सुरू करा",
    aiPoweredAdvisor: "AI-आधारित ग्रामीण व्यवसाय सल्लागार",
    smarterBusiness: "तुमच्या कल्पनेला अधिक स्मार्ट व्यवसायात बदला.",
    heroDesc:
      "GramSaarthi AI ग्रामीण उद्योजकांना योग्य व्यवसाय शोधण्यात, स्थानिक बाजार समजण्यात, जोखीम व्यवस्थापित करण्यात आणि कर्ज घेण्यापूर्वी आर्थिक नियोजन करण्यात मदत करते.",
    startBusinessAssessment: "व्यवसाय मूल्यांकन सुरू करा",
    exploreFeatures: "वैशिष्ट्ये पहा",
    simpleToUse: "वापरण्यास सोपे",
    localInsights: "स्थानिक माहिती",
    smartFinancialPlanning: "स्मार्ट आर्थिक नियोजन",
    aiBusinessAdvisor: "AI व्यवसाय सल्लागार",
    online: "ऑनलाइन",
    namaste: "नमस्ते!",
    askGramSaarthi: "GramSaarthi ला विचारा...",
    whatWeOffer: "आम्ही काय देतो",
    everythingBeforeInvest: "गुंतवणुकीपूर्वी आवश्यक सर्व काही.",
    aiBusinessMatching: "AI व्यवसाय जुळवणी",
    aiBusinessMatchingDesc:
      "तुमची भांडवल, कौशल्ये, संसाधने आणि स्थानिक संधींशी जुळणारे व्यवसाय शोधा.",
    localMarketAnalysis: "स्थानिक बाजार विश्लेषण",
    localMarketAnalysisDesc:
      "तुमच्या गावाभोवतीची मागणी, स्पर्धा आणि बाजारातील संधी समजा.",
    businessSimulatorDesc:
      "पैसे गुंतवण्यापूर्वी वेगवेगळ्या किंमती, ग्राहक आणि खर्चांची चाचणी घ्या.",
    smartFinancialPlanningDesc:
      "प्रकल्प खर्च, संभाव्य वित्तपुरवठा आणि परतफेड योजना समजा.",
    howItWorksTitle: "हे कसे काम करते",
    fourSteps: "कल्पनेपासून कृतीपर्यंत 4 सोप्या पायऱ्या.",
    tellUsAboutYou: "तुमच्याबद्दल सांगा",
    tellUsAboutYouDesc:
      "तुमचे स्थान, भांडवल, कौशल्ये आणि संसाधने सांगा.",
    discoverOpportunities: "संधी शोधा",
    discoverOpportunitiesDesc:
      "आमची प्रणाली योग्य स्थानिक व्यवसाय संधींचे विश्लेषण करते.",
    testYourIdea: "तुमच्या कल्पनेची चाचणी घ्या",
    testYourIdeaDesc:
      "नफा, जोखीम आणि विविध व्यवसाय परिस्थितींचे सिम्युलेशन करा.",
    planWithConfidence: "आत्मविश्वासाने नियोजन करा",
    planWithConfidenceDesc:
      "तुमचा वैयक्तिक व्यवसाय आणि आर्थिक मार्ग मिळवा.",
    footerText:
      "ग्रामीण स्तरावर स्मार्ट उद्योजकतेला सक्षम बनवणे.",

    dairyBusiness: "दुग्ध व्यवसाय",
    groceryStore: "किराणा दुकान",
    tailoringBusiness: "शिवणकाम व्यवसाय",
    poultryBusiness: "पोल्ट्री व्यवसाय",
    foodProcessing: "अन्न प्रक्रिया",
    smallGroceryStore: "लहान किराणा दुकान",
    dairyReason:
      "स्थानिक मागणी आणि संसाधने उपलब्ध असल्यास दुग्ध व्यवसायात चांगली क्षमता आहे.",
    groceryReason:
      "किराणा व्यवसायाला स्थानिक कुटुंबांच्या नियमित मागणीचा फायदा होऊ शकतो.",
    tailoringReason:
      "शिवणकाम व्यवसाय तुलनेने कमी प्रारंभिक गुंतवणुकीत आणि कौशल्यावर आधारित कामाने सुरू करता येतो.",
    poultryReason:
      "पोल्ट्रीला चांगली स्थानिक मागणी मिळू शकते, परंतु खर्च आणि आरोग्याचे काळजीपूर्वक व्यवस्थापन आवश्यक आहे.",
    foodProcessingReason:
      "स्थानिक अन्न प्रक्रिया कृषी उत्पादनातून मूल्य निर्माण करू शकते आणि जवळच्या बाजारांना सेवा देऊ शकते.",
    smallGroceryReason:
      "लहान किराणा दुकान स्थानिक समुदायाच्या दैनंदिन गरजा पूर्ण करू शकते.",
    microFinance: "मायक्रो फायनान्स",
    termLoan: "टर्म लोन",
    aiAnalysisFailed: "AI विश्लेषण अयशस्वी झाले. कृपया पुन्हा प्रयत्न करा.",
    backendError:
      "GramSaarthi AI शी कनेक्ट होता आले नाही. कृपया backend सुरू आहे याची खात्री करा.",
    aiReportError:
      "AI अहवाल दाखवता आला नाही. कृपया पुन्हा विश्लेषण करा.",
  },

  Punjabi: {
    step1: "ਕਦਮ 1 / 3",
    assessment: "ਕਾਰੋਬਾਰ ਮੁਲਾਂਕਣ",
    tellSituation: "ਆਪਣੀ ਸਥਿਤੀ ਬਾਰੇ ਦੱਸੋ।",
    assessmentDesc:
      "ਤੁਹਾਡੇ ਸਰੋਤਾਂ ਅਤੇ ਸਥਾਨਕ ਬਾਜ਼ਾਰ ਨਾਲ ਮੇਲ ਖਾਂਦੇ ਕਾਰੋਬਾਰੀ ਮੌਕੇ ਲੱਭਣ ਲਈ ਅਸੀਂ ਇਸ ਜਾਣਕਾਰੀ ਦੀ ਵਰਤੋਂ ਕਰਾਂਗੇ।",
    location: "ਤੁਸੀਂ ਕਾਰੋਬਾਰ ਕਿੱਥੇ ਸ਼ੁਰੂ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
    locationPlaceholder: "ਪਿੰਡ / ਸ਼ਹਿਰ ਦਰਜ ਕਰੋ",
    capital: "ਤੁਹਾਡੇ ਕੋਲ ਆਪਣੀ ਕਿੰਨੀ ਪੂੰਜੀ ਹੈ?",
    capitalPlaceholder: "ਉਦਾਹਰਨ: ₹80,000",
    language: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
    skills: "ਤੁਹਾਡੇ ਕੋਲ ਕਿਹੜੇ ਹੁਨਰ ਜਾਂ ਤਜਰਬੇ ਹਨ?",
    skillsPlaceholder: "ਉਦਾਹਰਨ: ਖੇਤੀ, ਸਿਲਾਈ, ਖਾਣਾ ਬਣਾਉਣਾ...",
    resources: "ਤੁਹਾਡੇ ਕੋਲ ਪਹਿਲਾਂ ਹੀ ਕਿਹੜੇ ਸਰੋਤ ਹਨ?",
    resourcesPlaceholder: "ਉਦਾਹਰਨ: ਜ਼ਮੀਨ, ਦੁਕਾਨ, ਪਸ਼ੂ...",
    businessIdea: "ਕੀ ਤੁਹਾਡੇ ਕੋਲ ਪਹਿਲਾਂ ਹੀ ਕੋਈ ਕਾਰੋਬਾਰੀ ਵਿਚਾਰ ਹੈ?",
    selectBusiness: "ਕਾਰੋਬਾਰ ਚੁਣੋ",
    continue: "ਅੱਗੇ ਵਧੋ",

    assessmentComplete: "ਮੁਲਾਂਕਣ ਪੂਰਾ",
    businessMatch: "ਤੁਹਾਡੇ ਕਾਰੋਬਾਰ ਦਾ ਮੇਲ",
    found: "ਸਾਨੂੰ ਇਹ ਮਿਲਿਆ ਹੈ।",
    matchDesc:
      "ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਦੇ ਆਧਾਰ 'ਤੇ ਇਹ ਕਾਰੋਬਾਰ ਤੁਹਾਡੀ ਸਥਿਤੀ ਲਈ ਢੁਕਵੇਂ ਹੋ ਸਕਦੇ ਹਨ।",
    recommended: "#1 ਸਿਫਾਰਸ਼",
    matchScore: "ਮੇਲ ਸਕੋਰ",
    marketReach: "ਬਾਜ਼ਾਰ ਪਹੁੰਚ",
    primaryCustomers: "ਮੁੱਖ ਗਾਹਕ",
    distributionChannels: "ਵੰਡ ਦੇ ਸਾਧਨ",
    opportunity: "ਮੌਕੇ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ",
    swot: "SWOT ਵਿਸ਼ਲੇਸ਼ਣ",
    localDemand: "ਸਥਾਨਕ ਮੰਗ",
    capitalFit: "ਪੂੰਜੀ ਦੀ ਯੋਗਤਾ",
    resourceFit: "ਸਰੋਤਾਂ ਦੀ ਯੋਗਤਾ",
    risk: "ਜੋਖਮ",
    exploreBusiness: "ਕਾਰੋਬਾਰ ਵੇਖੋ",
    strengths: "ਤਾਕਤਾਂ",
    weaknesses: "ਕਮਜ਼ੋਰੀਆਂ",
    opportunities: "ਮੌਕੇ",
    threats: "ਖਤਰੇ",
    localThreats: "ਸਥਾਨਕ ਖਤਰੇ",
    competitors: "ਮੁਕਾਬਲੇਬਾਜ਼ ਵਿਸ਼ਲੇਸ਼ਣ",
    mainCompetitors: "ਮੁੱਖ ਮੁਕਾਬਲੇਬਾਜ਼",
    competitiveAdvantage: "ਤੁਹਾਡਾ ਮੁਕਾਬਲੇ ਵਾਲਾ ਫਾਇਦਾ",
    pricing: "ਕੀਮਤ ਰਣਨੀਤੀ",
    strategy: "ਰਣਨੀਤੀ:",
    suggestedPricing: "ਸੁਝਾਈ ਕੀਮਤ:",
    why: "ਕਿਉਂ:",
    recommendation: "GramSaarthi ਸਿਫਾਰਸ਼",
    recommendedSteps: "ਸਿਫਾਰਸ਼ ਕੀਤੇ ਕਦਮ",

    marketAnalysis: "ਬਾਜ਼ਾਰ ਵਿਸ਼ਲੇਸ਼ਣ",
    hyperLocalMarket: "ਸਥਾਨਕ ਬਾਜ਼ਾਰ ਵਿਸ਼ਲੇਸ਼ਣ",
    understandMarket: "ਆਪਣੇ ਸਥਾਨਕ ਬਾਜ਼ਾਰ ਨੂੰ ਸਮਝੋ।",
    marketDesc:
      "ਤੁਹਾਡੇ ਚੁਣੇ ਹੋਏ ਸਥਾਨ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਦੇ ਮੌਕਿਆਂ ਦਾ ਇਹ ਡੈਮੋ ਵਿਸ਼ਲੇਸ਼ਣ ਹੈ।",
    yourVillage: "ਤੁਹਾਡਾ ਪਿੰਡ",
    localMarketArea: "ਸਥਾਨਕ ਬਾਜ਼ਾਰ ਖੇਤਰ",
    estimatedDemand: "ਅੰਦਾਜ਼ਿਤ ਮੰਗ",
    high: "ਉੱਚ",
    competition: "ਮੁਕਾਬਲਾ",
    medium: "ਦਰਮਿਆਨਾ",
    growthPotential: "ਵਿਕਾਸ ਦੀ ਸੰਭਾਵਨਾ",
    strong: "ਮਜ਼ਬੂਤ",
    seasonalDemand: "ਮੌਸਮੀ ਮੰਗ",
    whenDemandHighest: "ਮੰਗ ਸਭ ਤੋਂ ਵੱਧ ਕਦੋਂ ਹੁੰਦੀ ਹੈ?",
    demoData: "ਡੈਮੋ ਡਾਟਾ",
    summer: "ਗਰਮੀ",
    monsoon: "ਮਾਨਸੂਨ",
    winter: "ਸਰਦੀ",
    festival: "ਤਿਉਹਾਰ",
    competitorMap: "ਮੁਕਾਬਲੇਬਾਜ਼ ਨਕਸ਼ਾ",
    nearbyBusinessActivity: "ਨੇੜੇ ਦੀ ਕਾਰੋਬਾਰੀ ਗਤੀਵਿਧੀ",
    illustrative: "ਉਦਾਹਰਨਾਤਮਕ",
    localMarketRadius: "5–10 ਕਿਮੀ ਸਥਾਨਕ ਬਾਜ਼ਾਰ",
    yourLocation: "ਤੁਹਾਡਾ ਸਥਾਨ",
    mapNote:
      "ਇਹ ਪ੍ਰੋਟੋਟਾਈਪ ਉਦਾਹਰਨਾਤਮਕ ਡਾਟਾ ਵਰਤਦਾ ਹੈ। ਅਸਲ ਮੁਕਾਬਲੇਬਾਜ਼ ਅਤੇ ਬਾਜ਼ਾਰ ਡਾਟਾ ਬਾਅਦ ਵਿੱਚ API ਰਾਹੀਂ ਜੋੜਿਆ ਜਾ ਸਕਦਾ ਹੈ।",
    analyzeRisks: "ਕਾਰੋਬਾਰੀ ਜੋਖਮਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",

    riskAnalysis: "ਜੋਖਮ ਵਿਸ਼ਲੇਸ਼ਣ",
    aiRiskAnalysis: "AI ਜੋਖਮ ਵਿਸ਼ਲੇਸ਼ਣ",
    knowRisks: "ਨਿਵੇਸ਼ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਜੋਖਮ ਜਾਣੋ।",
    riskDesc:
      "ਆਪਣੇ ਚੁਣੇ ਕਾਰੋਬਾਰ ਨਾਲ ਜੁੜੇ ਮੁੱਖ ਜੋਖਮਾਂ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਸੰਭਾਲਣ ਦੇ ਤਰੀਕਿਆਂ ਨੂੰ ਸਮਝੋ।",
    overallRisk: "ਕੁੱਲ ਕਾਰੋਬਾਰੀ ਜੋਖਮ",
    manageablePlanning: "ਧਿਆਨ ਨਾਲ ਯੋਜਨਾ ਬਣਾਕੇ ਇਸ ਜੋਖਮ ਨੂੰ ਸੰਭਾਲਿਆ ਜਾ ਸਕਦਾ ਹੈ।",
    marketRisk: "ਬਾਜ਼ਾਰ ਜੋਖਮ",
    changingDemand: "ਬਦਲਦੀ ਸਥਾਨਕ ਮੰਗ",
    marketRiskDesc:
      "ਮੌਸਮ, ਕੀਮਤਾਂ ਅਤੇ ਸਥਾਨਕ ਮੁਕਾਬਲੇ ਕਾਰਨ ਗਾਹਕਾਂ ਦੀ ਮੰਗ ਬਦਲ ਸਕਦੀ ਹੈ।",
    financialRisk: "ਵਿੱਤੀ ਜੋਖਮ",
    initialInvestment: "ਸ਼ੁਰੂਆਤੀ ਨਿਵੇਸ਼",
    financialRiskDesc:
      "ਕਾਰੋਬਾਰ ਸ਼ੁਰੂ ਕਰਨ ਅਤੇ ਵਧਾਉਣ ਸਮੇਂ ਕਾਫ਼ੀ ਕਾਰਜਸ਼ੀਲ ਪੂੰਜੀ ਰੱਖੋ।",
    seasonalRisk: "ਮੌਸਮੀ ਜੋਖਮ",
    seasonDependentSales: "ਮੌਸਮ 'ਤੇ ਨਿਰਭਰ ਵਿਕਰੀ",
    seasonalRiskDesc:
      "ਕੁਝ ਕਾਰੋਬਾਰਾਂ ਵਿੱਚ ਵੱਖ-ਵੱਖ ਮੌਸਮਾਂ ਦੌਰਾਨ ਮੰਗ ਬਦਲ ਸਕਦੀ ਹੈ।",
    low: "ਘੱਟ",
    aiSwot: "AI SWOT ਵਿਸ਼ਲੇਸ਼ਣ",
    businessAtGlance: "ਤੁਹਾਡੇ ਕਾਰੋਬਾਰ ਦੀ ਇੱਕ ਝਲਕ",
    strongLocalDemand: "ਮਜ਼ਬੂਤ ਸਥਾਨਕ ਮੰਗ",
    repeatCustomers: "ਮੁੜ ਆਉਣ ਵਾਲੇ ਗਾਹਕਾਂ ਦੀ ਸੰਭਾਵਨਾ",
    manageableScale: "ਛੋਟੇ ਪੱਧਰ 'ਤੇ ਸ਼ੁਰੂ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ",
    limitedResources: "ਸੀਮਤ ਸਰੋਤ",
    consistentQuality: "ਲਗਾਤਾਰ ਗੁਣਵੱਤਾ ਬਣਾਈ ਰੱਖਣ ਦੀ ਲੋੜ",
    limitedMarketReach: "ਸ਼ੁਰੂਆਤੀ ਬਾਜ਼ਾਰ ਪਹੁੰਚ ਸੀਮਤ",
    growingLocalDemand: "ਵਧਦੀ ਸਥਾਨਕ ਮੰਗ",
    digitalMarketing: "ਡਿਜ਼ੀਟਲ ਮਾਰਕੀਟਿੰਗ ਦੇ ਮੌਕੇ",
    governmentSupport: "ਸਰਕਾਰੀ ਸਹਾਇਤਾ ਦੇ ਮੌਕੇ",
    newCompetitors: "ਨਵੇਂ ਮੁਕਾਬਲੇਬਾਜ਼",
    priceFluctuations: "ਕੀਮਤਾਂ ਵਿੱਚ ਉਤਾਰ-ਚੜ੍ਹਾਅ",
    seasonalChanges: "ਮੌਸਮੀ ਬਦਲਾਅ",
    trySimulator: "ਕਾਰੋਬਾਰ ਸਿਮੂਲੇਟਰ ਅਜ਼ਮਾਓ",

    businessSimulator: "ਕਾਰੋਬਾਰ ਸਿਮੂਲੇਟਰ",
    whatIfSimulator: "ਕਾਰੋਬਾਰ ਸਿਮੂਲੇਟਰ",
    testIdea: "ਨਿਵੇਸ਼ ਤੋਂ ਪਹਿਲਾਂ ਆਪਣੇ ਵਿਚਾਰ ਦੀ ਜਾਂਚ ਕਰੋ।",
    simulatorDesc:
      "ਹੇਠਾਂ ਦਿੱਤੇ ਅੰਕ ਬਦਲੋ ਅਤੇ ਆਪਣੇ ਅੰਦਾਜ਼ਿਤ ਕਾਰੋਬਾਰੀ ਪ੍ਰਦਰਸ਼ਨ ਵਿੱਚ ਬਦਲਾਅ ਵੇਖੋ।",
    initialInvestment: "ਸ਼ੁਰੂਆਤੀ ਨਿਵੇਸ਼",
    customersPerDay: "ਰੋਜ਼ਾਨਾ ਗਾਹਕ",
    averagePrice: "ਪ੍ਰਤੀ ਗਾਹਕ ਔਸਤ ਕੀਮਤ",
    monthlyExpenses: "ਮਹੀਨਾਵਾਰ ਖਰਚੇ",
    monthlyRevenue: "ਮਹੀਨਾਵਾਰ ਆਮਦਨ",
    monthlyProfit: "ਮਹੀਨਾਵਾਰ ਲਾਭ",
    yearlyProfit: "ਸਾਲਾਨਾ ਲਾਭ",
    gramSaarthiInsight: "GramSaarthi ਜਾਣਕਾਰੀ",
    simulatorNote:
      "ਇਹ ਤੁਹਾਡੀਆਂ ਧਾਰਣਾਵਾਂ 'ਤੇ ਆਧਾਰਿਤ ਪ੍ਰੋਟੋਟਾਈਪ ਅੰਦਾਜ਼ਾ ਹੈ। ਅਸਲ ਨਤੀਜੇ ਸਥਾਨਕ ਮੰਗ, ਕੀਮਤ, ਚਲਾਉਣ ਦੇ ਖਰਚੇ ਅਤੇ ਹੋਰ ਕਾਰੋਬਾਰੀ ਹਾਲਾਤਾਂ ਅਨੁਸਾਰ ਬਦਲ ਸਕਦੇ ਹਨ।",
    planFinances: "ਆਪਣੀ ਵਿੱਤੀ ਯੋਜਨਾ ਬਣਾਓ",

    financialPlanner: "ਵਿੱਤੀ ਯੋਜਨਾਕਾਰ",
    smartFinancialPlanning: "ਸਮਾਰਟ ਵਿੱਤੀ ਯੋਜਨਾ",
    planFunding: "ਕਰਜ਼ਾ ਲੈਣ ਤੋਂ ਪਹਿਲਾਂ ਆਪਣੀ ਫੰਡਿੰਗ ਦੀ ਯੋਜਨਾ ਬਣਾਓ।",
    financeDesc:
      "ਆਪਣੇ ਅੰਦਾਜ਼ਿਤ ਨਿਵੇਸ਼, ਆਪਣੇ ਯੋਗਦਾਨ ਅਤੇ ਸੰਭਾਵਿਤ ਵਿੱਤੀ ਲੋੜ ਨੂੰ ਸਮਝੋ।",
    estimatedProjectCost: "ਅੰਦਾਜ਼ਿਤ ਪ੍ਰੋਜੈਕਟ ਲਾਗਤ",
    yourContribution: "ਤੁਹਾਡਾ ਯੋਗਦਾਨ",
    estimatedFundingGap: "ਅੰਦਾਜ਼ਿਤ ਫੰਡਿੰਗ ਘਾਟ",
    loanPreview: "ਕਰਜ਼ੇ ਦੀ ਝਲਕ",
    possibleRepayment: "ਸੰਭਾਵਿਤ ਭੁਗਤਾਨ ਸਥਿਤੀ",
    loanAmount: "ਕਰਜ਼ੇ ਦੀ ਰਕਮ",
    interestRate: "ਵਿਆਜ ਦਰ",
    tenure: "ਮਿਆਦ",
    scheme: "ਯੋਜਨਾ",
    moratorium: "ਮੋਰਾਟੋਰਿਅਮ",
    estimatedEmi: "ਅੰਦਾਜ਼ਿਤ EMI",
    repaymentRoadmap: "ਭੁਗਤਾਨ ਰੋਡਮੈਪ",
    repaymentJourney: "ਤੁਹਾਡੀ ਅੰਦਾਜ਼ਿਤ ਭੁਗਤਾਨ ਯਾਤਰਾ",
    initialMoratorium: "ਸ਼ੁਰੂਆਤੀ ਮੋਰਾਟੋਰਿਅਮ",
    repaymentPeriod: "ਭੁਗਤਾਨ ਮਿਆਦ",
    monthlyEmi: "ਮਹੀਨਾਵਾਰ EMI",
    annualEmi: "ਸਾਲਾਨਾ EMI",
    illustrative: "ਉਦਾਹਰਨਾਤਮਕ",
    schemeNote:
      "ਇਹ ਇੱਕ ਉਦਾਹਰਨਾਤਮਕ ਭੁਗਤਾਨ ਅੰਦਾਜ਼ਾ ਹੈ। ਅਸਲ ਕਰਜ਼ੇ ਦੀਆਂ ਸ਼ਰਤਾਂ, ਵਿਆਜ, ਸਬਸਿਡੀ ਅਤੇ ਮੋਰਾਟੋਰਿਅਮ ਕਰਜ਼ਾਦਾਤਾ ਅਤੇ ਯੋਜਨਾ ਦੀ ਯੋਗਤਾ 'ਤੇ ਨਿਰਭਰ ਕਰਦੇ ਹਨ।",
    downloadReport: "ਪੂਰੀ ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ",
    downloadCompleteReport: "ਪੂਰੀ ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ",
    listen: "ਸੁਣੋ",
    audioLoading: "ਆਡੀਓ ਤਿਆਰ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    audioNotSupported: "ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਵੌਇਸ ਆਊਟਪੁਟ ਸਹਿਯੋਗ ਨਹੀਂ ਹੈ।",
    audioError: "ਜਨਰੇਟ ਕੀਤੀ ਆਡੀਓ ਚਲਾਈ ਨਹੀਂ ਜਾ ਸਕੀ।",
    supportOpportunities: "ਸਹਾਇਤਾ ਦੇ ਮੌਕੇ",
    exploreSupport: "ਸੰਭਾਵਿਤ ਸਹਾਇਤਾ ਯੋਜਨਾਵਾਂ ਵੇਖੋ",
    governmentBankSupport: "ਸਰਕਾਰ / ਬੈਂਕ ਸਹਾਇਤਾ",
    supportDesc:
      "ਤੁਹਾਡੇ ਸਥਾਨ, ਕਾਰੋਬਾਰ ਦੀ ਕਿਸਮ ਅਤੇ ਯੋਗਤਾ ਦੇ ਅਧਾਰ 'ਤੇ ਤੁਸੀਂ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ, ਸਬਸਿਡੀਆਂ ਜਾਂ ਰਸਮੀ ਕਰੈਡਿਟ ਪ੍ਰੋਗਰਾਮ ਵੇਖ ਸਕਦੇ ਹੋ।",
    explore: "ਵੇਖੋ",
    supportNote:
      "ਯੋਜਨਾ ਦੀ ਯੋਗਤਾ ਅਤੇ ਉਪਲਬਧਤਾ ਨੂੰ ਹਮੇਸ਼ਾ ਅਧਿਕਾਰਤ ਸਰਕਾਰੀ ਜਾਂ ਬੈਂਕਿੰਗ ਸਰੋਤਾਂ ਰਾਹੀਂ ਜਾਂਚਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ।",
    gramSaarthiRecommendation: "GramSaarthi ਸਿਫਾਰਸ਼",
    financeAdvice:
      "ਸਭ ਤੋਂ ਛੋਟੇ ਵਿਹਾਰਕ ਨਿਵੇਸ਼ ਨਾਲ ਸ਼ੁਰੂ ਕਰੋ, ਐਮਰਜੈਂਸੀ ਕਾਰਜਸ਼ੀਲ ਪੂੰਜੀ ਰੱਖੋ ਅਤੇ ਕਰਜ਼ਾ ਲੈਣ ਤੋਂ ਪਹਿਲਾਂ ਵਿੱਤੀ ਵਿਕਲਪਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ।",
    generateRoadmap: "ਮੇਰਾ ਕਾਰੋਬਾਰੀ ਰੋਡਮੈਪ ਬਣਾਓ",

    yourBusinessRoadmap: "ਤੁਹਾਡਾ ਕਾਰੋਬਾਰੀ ਰੋਡਮੈਪ",
    personalizedRoadmap: "ਨਿੱਜੀ ਰੋਡਮੈਪ",
    pathIdeaAction: "ਵਿਚਾਰ ਤੋਂ ਕਾਰਵਾਈ ਤੱਕ ਤੁਹਾਡਾ ਰਸਤਾ।",
    roadmapDesc:
      "ਤੁਹਾਡੇ ਵੱਲੋਂ ਦਿੱਤੀ ਜਾਣਕਾਰੀ ਦੇ ਆਧਾਰ 'ਤੇ ਇਹ ਇੱਕ ਸਧਾਰਨ ਸ਼ੁਰੂਆਤੀ ਯੋਜਨਾ ਹੈ।",
    recommendedBusiness: "ਸਿਫਾਰਸ਼ ਕੀਤਾ ਕਾਰੋਬਾਰ",
    startingPoint: "ਤੁਹਾਡੀ ਸ਼ੁਰੂਆਤੀ ਸਥਿਤੀ",
    notSpecified: "ਦਰਜ ਨਹੀਂ",
    actionPlan: "30 ਦਿਨਾਂ ਦੀ ਕਾਰਵਾਈ ਯੋਜਨਾ",
    startSmall: "ਛੋਟਾ ਸ਼ੁਰੂ ਕਰੋ। ਸਿੱਖੋ। ਫਿਰ ਵਧੋ।",
    validateDemand: "ਸਥਾਨਕ ਮੰਗ ਦੀ ਜਾਂਚ ਕਰੋ",
    validateDemandDesc:
      "ਵੱਡਾ ਖਰਚ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਸੰਭਾਵਿਤ ਗਾਹਕਾਂ ਨਾਲ ਗੱਲ ਕਰੋ ਅਤੇ ਸਮਝੋ ਕਿ ਉਨ੍ਹਾਂ ਨੂੰ ਅਸਲ ਵਿੱਚ ਕੀ ਚਾਹੀਦਾ ਹੈ।",
    smallPilot: "ਛੋਟੇ ਪਾਇਲਟ ਨਾਲ ਸ਼ੁਰੂ ਕਰੋ",
    smallPilotDesc:
      "ਆਪਣੇ ਉਤਪਾਦ ਜਾਂ ਸੇਵਾ ਦੀ ਛੋਟੇ ਪੱਧਰ 'ਤੇ ਜਾਂਚ ਕਰੋ ਅਤੇ ਲਾਗਤ ਤੇ ਵਿਕਰੀ ਦਰਜ ਕਰੋ।",
    trackNumbers: "ਆਪਣੇ ਅੰਕੜੇ ਟਰੈਕ ਕਰੋ",
    trackNumbersDesc:
      "ਸਿਰਫ਼ ਧਾਰਣਾਵਾਂ 'ਤੇ ਨਿਰਭਰ ਕਰਨ ਦੀ ਬਜਾਏ ਗਾਹਕਾਂ, ਆਮਦਨ, ਖਰਚਿਆਂ ਅਤੇ ਮਹੀਨਾਵਾਰ ਲਾਭ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ।",
    scaleCarefully: "ਸਾਵਧਾਨੀ ਨਾਲ ਵਧਾਓ",
    scaleCarefullyDesc:
      "ਲਾਭ ਨੂੰ ਮੁੜ ਨਿਵੇਸ਼ ਕਰੋ ਅਤੇ ਕਾਰੋਬਾਰ ਵਿੱਚ ਲਗਾਤਾਰ ਮੰਗ ਦਿਖਣ ਤੋਂ ਬਾਅਦ ਹੀ ਵਾਧੂ ਵਿੱਤ ਬਾਰੇ ਸੋਚੋ।",
    estimatedMonthlyRevenue: "ਅੰਦਾਜ਼ਿਤ ਮਹੀਨਾਵਾਰ ਆਮਦਨ",
    estimatedMonthlyProfit: "ਅੰਦਾਜ਼ਿਤ ਮਹੀਨਾਵਾਰ ਲਾਭ",
    businessRisk: "ਕਾਰੋਬਾਰੀ ਜੋਖਮ",
    finalAdvice: "GramSaarthi ਦੀ ਅੰਤਿਮ ਸਲਾਹ",
    finalAdviceDesc:
      "ਸਭ ਤੋਂ ਵੱਡੇ ਸੰਭਵ ਨਿਵੇਸ਼ ਨਾਲ ਸ਼ੁਰੂ ਨਾ ਕਰੋ। ਵਿਹਾਰਕ ਪਾਇਲਟ ਨਾਲ ਸ਼ੁਰੂ ਕਰੋ, ਮੰਗ ਦੀ ਜਾਂਚ ਕਰੋ, ਖਰਚੇ ਕਾਬੂ ਕਰੋ ਅਤੇ ਅੰਕੜੇ ਠੀਕ ਹੋਣ 'ਤੇ ਵਧੋ।",
    backToGramSaarthi: "GramSaarthi 'ਤੇ ਵਾਪਸ ਜਾਓ",

    features: "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
    howItWorks: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    startAssessment: "ਮੁਲਾਂਕਣ ਸ਼ੁਰੂ ਕਰੋ",
    aiPoweredAdvisor: "AI-ਸੰਚਾਲਿਤ ਪੇਂਡੂ ਕਾਰੋਬਾਰੀ ਸਲਾਹਕਾਰ",
    smarterBusiness: "ਆਪਣੇ ਵਿਚਾਰ ਨੂੰ ਇੱਕ ਸਮਾਰਟ ਕਾਰੋਬਾਰ ਵਿੱਚ ਬਦਲੋ।",
    heroDesc:
      "GramSaarthi AI ਪੇਂਡੂ ਉਦਮੀਆਂ ਨੂੰ ਸਹੀ ਕਾਰੋਬਾਰ ਲੱਭਣ, ਸਥਾਨਕ ਬਾਜ਼ਾਰ ਸਮਝਣ, ਜੋਖਮ ਸੰਭਾਲਣ ਅਤੇ ਕਰਜ਼ਾ ਲੈਣ ਤੋਂ ਪਹਿਲਾਂ ਵਿੱਤੀ ਯੋਜਨਾ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
    startBusinessAssessment: "ਕਾਰੋਬਾਰ ਮੁਲਾਂਕਣ ਸ਼ੁਰੂ ਕਰੋ",
    exploreFeatures: "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵੇਖੋ",
    simpleToUse: "ਵਰਤਣ ਵਿੱਚ ਆਸਾਨ",
    localInsights: "ਸਥਾਨਕ ਜਾਣਕਾਰੀ",
    smartFinancialPlanning: "ਸਮਾਰਟ ਵਿੱਤੀ ਯੋਜਨਾ",
    aiBusinessAdvisor: "AI ਕਾਰੋਬਾਰੀ ਸਲਾਹਕਾਰ",
    online: "ਆਨਲਾਈਨ",
    namaste: "ਨਮਸਤੇ!",
    askGramSaarthi: "GramSaarthi ਨੂੰ ਪੁੱਛੋ...",
    whatWeOffer: "ਅਸੀਂ ਕੀ ਦਿੰਦੇ ਹਾਂ",
    everythingBeforeInvest: "ਨਿਵੇਸ਼ ਤੋਂ ਪਹਿਲਾਂ ਤੁਹਾਨੂੰ ਲੋੜੀਂਦੀ ਹਰ ਚੀਜ਼।",
    aiBusinessMatching: "AI ਕਾਰੋਬਾਰ ਮੇਲ",
    aiBusinessMatchingDesc:
      "ਆਪਣੀ ਪੂੰਜੀ, ਹੁਨਰਾਂ, ਸਰੋਤਾਂ ਅਤੇ ਸਥਾਨਕ ਮੌਕਿਆਂ ਨਾਲ ਮੇਲ ਖਾਂਦੇ ਕਾਰੋਬਾਰ ਲੱਭੋ।",
    localMarketAnalysis: "ਸਥਾਨਕ ਬਾਜ਼ਾਰ ਵਿਸ਼ਲੇਸ਼ਣ",
    localMarketAnalysisDesc:
      "ਆਪਣੇ ਪਿੰਡ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਮੰਗ, ਮੁਕਾਬਲਾ ਅਤੇ ਬਾਜ਼ਾਰ ਦੇ ਮੌਕੇ ਸਮਝੋ।",
    businessSimulatorDesc:
      "ਪੈਸਾ ਲਗਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਵੱਖ-ਵੱਖ ਕੀਮਤਾਂ, ਗਾਹਕਾਂ ਅਤੇ ਖਰਚਿਆਂ ਦੀ ਜਾਂਚ ਕਰੋ।",
    smartFinancialPlanningDesc:
      "ਆਪਣੀ ਪ੍ਰੋਜੈਕਟ ਲਾਗਤ, ਸੰਭਾਵਿਤ ਵਿੱਤ ਅਤੇ ਭੁਗਤਾਨ ਯੋਜਨਾ ਸਮਝੋ।",
    howItWorksTitle: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    fourSteps: "ਵਿਚਾਰ ਤੋਂ ਕਾਰਵਾਈ ਤੱਕ 4 ਸਧਾਰਨ ਕਦਮ।",
    tellUsAboutYou: "ਆਪਣੇ ਬਾਰੇ ਦੱਸੋ",
    tellUsAboutYouDesc: "ਆਪਣਾ ਸਥਾਨ, ਪੂੰਜੀ, ਹੁਨਰ ਅਤੇ ਸਰੋਤ ਸਾਂਝੇ ਕਰੋ।",
    discoverOpportunities: "ਮੌਕੇ ਲੱਭੋ",
    discoverOpportunitiesDesc:
      "ਸਾਡੀ ਪ੍ਰਣਾਲੀ ਢੁਕਵੇਂ ਸਥਾਨਕ ਕਾਰੋਬਾਰੀ ਮੌਕਿਆਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਦੀ ਹੈ।",
    testYourIdea: "ਆਪਣੇ ਵਿਚਾਰ ਦੀ ਜਾਂਚ ਕਰੋ",
    testYourIdeaDesc:
      "ਲਾਭ, ਜੋਖਮ ਅਤੇ ਵੱਖ-ਵੱਖ ਕਾਰੋਬਾਰੀ ਸਥਿਤੀਆਂ ਦਾ ਸਿਮੂਲੇਸ਼ਨ ਕਰੋ।",
    planWithConfidence: "ਭਰੋਸੇ ਨਾਲ ਯੋਜਨਾ ਬਣਾਓ",
    planWithConfidenceDesc:
      "ਆਪਣਾ ਨਿੱਜੀ ਕਾਰੋਬਾਰੀ ਅਤੇ ਵਿੱਤੀ ਰੋਡਮੈਪ ਪ੍ਰਾਪਤ ਕਰੋ।",
    footerText:
      "ਪੇਂਡੂ ਪੱਧਰ 'ਤੇ ਸਮਾਰਟ ਉਦਮਸ਼ੀਲਤਾ ਨੂੰ ਮਜ਼ਬੂਤ ਬਣਾਉਣਾ।",

    dairyBusiness: "ਡੇਅਰੀ ਕਾਰੋਬਾਰ",
    groceryStore: "ਕਿਰਾਣਾ ਦੁਕਾਨ",
    tailoringBusiness: "ਸਿਲਾਈ ਕਾਰੋਬਾਰ",
    poultryBusiness: "ਪੋਲਟਰੀ ਕਾਰੋਬਾਰ",
    foodProcessing: "ਖੁਰਾਕ ਪ੍ਰੋਸੈਸਿੰਗ",
    smallGroceryStore: "ਛੋਟੀ ਕਿਰਾਣਾ ਦੁਕਾਨ",
    dairyReason:
      "ਸਥਾਨਕ ਮੰਗ ਅਤੇ ਸਰੋਤ ਉਪਲਬਧ ਹੋਣ 'ਤੇ ਡੇਅਰੀ ਵਿੱਚ ਚੰਗੀ ਸੰਭਾਵਨਾ ਹੈ।",
    groceryReason:
      "ਕਿਰਾਣਾ ਕਾਰੋਬਾਰ ਨੂੰ ਸਥਾਨਕ ਘਰਾਂ ਦੀ ਨਿਯਮਤ ਮੰਗ ਤੋਂ ਲਾਭ ਮਿਲ ਸਕਦਾ ਹੈ।",
    tailoringReason:
      "ਸਿਲਾਈ ਕਾਰੋਬਾਰ ਘੱਟ ਸ਼ੁਰੂਆਤੀ ਨਿਵੇਸ਼ ਅਤੇ ਹੁਨਰ-ਅਧਾਰਿਤ ਕੰਮ ਨਾਲ ਸ਼ੁਰੂ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।",
    poultryReason:
      "ਪੋਲਟਰੀ ਵਿੱਚ ਚੰਗੀ ਸਥਾਨਕ ਮੰਗ ਹੋ ਸਕਦੀ ਹੈ, ਪਰ ਲਾਗਤ ਅਤੇ ਸਿਹਤ ਦਾ ਧਿਆਨ ਨਾਲ ਪ੍ਰਬੰਧਨ ਲੋੜੀਂਦਾ ਹੈ।",
    foodProcessingReason:
      "ਸਥਾਨਕ ਖੁਰਾਕ ਪ੍ਰੋਸੈਸਿੰਗ ਖੇਤੀਬਾੜੀ ਉਤਪਾਦਾਂ ਤੋਂ ਮੁੱਲ ਪੈਦਾ ਕਰ ਸਕਦੀ ਹੈ ਅਤੇ ਨੇੜਲੇ ਬਾਜ਼ਾਰਾਂ ਨੂੰ ਸੇਵਾ ਦੇ ਸਕਦੀ ਹੈ।",
    smallGroceryReason:
      "ਛੋਟੀ ਕਿਰਾਣਾ ਦੁਕਾਨ ਸਥਾਨਕ ਭਾਈਚਾਰੇ ਦੀਆਂ ਰੋਜ਼ਾਨਾ ਲੋੜਾਂ ਪੂਰੀਆਂ ਕਰ ਸਕਦੀ ਹੈ।",
    microFinance: "ਮਾਈਕ੍ਰੋ ਫਾਇਨੈਂਸ",
    termLoan: "ਟਰਮ ਲੋਨ",
    aiAnalysisFailed: "AI ਵਿਸ਼ਲੇਸ਼ਣ ਅਸਫਲ ਹੋਇਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    backendError:
      "GramSaarthi AI ਨਾਲ ਕਨੈਕਟ ਨਹੀਂ ਹੋ ਸਕਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਯਕੀਨੀ ਬਣਾਓ ਕਿ backend ਚੱਲ ਰਿਹਾ ਹੈ।",
    aiReportError:
      "AI ਰਿਪੋਰਟ ਦਿਖਾਈ ਨਹੀਂ ਜਾ ਸਕੀ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ।",
  },

  Bengali: {
    step1: "ধাপ ১ / ৩",
    assessment: "ব্যবসায়িক মূল্যায়ন",
    tellSituation: "আপনার পরিস্থিতি সম্পর্কে বলুন।",
    assessmentDesc:
      "আপনার সম্পদ এবং স্থানীয় বাজারের সঙ্গে মানানসই ব্যবসার সুযোগ খুঁজতে আমরা এই তথ্য ব্যবহার করব।",
    location: "আপনি কোথায় ব্যবসা শুরু করতে চান?",
    locationPlaceholder: "গ্রাম / শহর লিখুন",
    capital: "আপনার নিজের কত মূলধন আছে?",
    capitalPlaceholder: "উদাহরণ: ₹80,000",
    language: "আপনার ভাষা নির্বাচন করুন",
    skills: "আপনার কী দক্ষতা বা অভিজ্ঞতা আছে?",
    skillsPlaceholder: "উদাহরণ: কৃষি, সেলাই, রান্না...",
    resources: "আপনার কাছে ইতিমধ্যে কী কী সম্পদ আছে?",
    resourcesPlaceholder: "উদাহরণ: জমি, দোকান, পশুসম্পদ...",
    businessIdea: "আপনার কি ইতিমধ্যে কোনো ব্যবসার ধারণা আছে?",
    selectBusiness: "ব্যবসা নির্বাচন করুন",
    continue: "এগিয়ে যান",

    assessmentComplete: "মূল্যায়ন সম্পূর্ণ",
    businessMatch: "আপনার ব্যবসার মিল",
    found: "আমরা এটি পেয়েছি।",
    matchDesc:
      "আপনার তথ্যের ভিত্তিতে এই ব্যবসাগুলি আপনার পরিস্থিতির জন্য উপযুক্ত হতে পারে।",
    recommended: "#১ সুপারিশ",
    matchScore: "মিল স্কোর",
    marketReach: "বাজারে পৌঁছানো",
    primaryCustomers: "প্রধান গ্রাহক",
    distributionChannels: "বিতরণ মাধ্যম",
    opportunity: "সুযোগ বিশ্লেষণ",
    swot: "SWOT বিশ্লেষণ",
    localDemand: "স্থানীয় চাহিদা",
    capitalFit: "মূলধনের উপযুক্ততা",
    resourceFit: "সম্পদের উপযুক্ততা",
    risk: "ঝুঁকি",
    exploreBusiness: "ব্যবসা দেখুন",
    strengths: "শক্তি",
    weaknesses: "দুর্বলতা",
    opportunities: "সুযোগ",
    threats: "হুমকি",
    localThreats: "স্থানীয় হুমকি",
    competitors: "প্রতিযোগী বিশ্লেষণ",
    mainCompetitors: "প্রধান প্রতিযোগী",
    competitiveAdvantage: "আপনার প্রতিযোগিতামূলক সুবিধা",
    pricing: "মূল্য নির্ধারণ কৌশল",
    strategy: "কৌশল:",
    suggestedPricing: "প্রস্তাবিত মূল্য:",
    why: "কেন:",
    recommendation: "GramSaarthi সুপারিশ",
    recommendedSteps: "প্রস্তাবিত পদক্ষেপ",

    marketAnalysis: "বাজার বিশ্লেষণ",
    hyperLocalMarket: "স্থানীয় বাজার বিশ্লেষণ",
    understandMarket: "আপনার স্থানীয় বাজার বুঝুন।",
    marketDesc:
      "আপনার নির্বাচিত এলাকার আশেপাশের সুযোগের এটি একটি ডেমো বিশ্লেষণ।",
    yourVillage: "আপনার গ্রাম",
    localMarketArea: "স্থানীয় বাজার এলাকা",
    estimatedDemand: "আনুমানিক চাহিদা",
    high: "উচ্চ",
    competition: "প্রতিযোগিতা",
    medium: "মাঝারি",
    growthPotential: "বৃদ্ধির সম্ভাবনা",
    strong: "শক্তিশালী",
    seasonalDemand: "মৌসুমি চাহিদা",
    whenDemandHighest: "চাহিদা কখন সবচেয়ে বেশি?",
    demoData: "ডেমো ডেটা",
    summer: "গ্রীষ্ম",
    monsoon: "বর্ষা",
    winter: "শীত",
    festival: "উৎসব",
    competitorMap: "প্রতিযোগী মানচিত্র",
    nearbyBusinessActivity: "কাছাকাছি ব্যবসায়িক কার্যকলাপ",
    illustrative: "উদাহরণমূলক",
    localMarketRadius: "৫–১০ কিমি স্থানীয় বাজার",
    yourLocation: "আপনার অবস্থান",
    mapNote:
      "এই প্রোটোটাইপে উদাহরণমূলক ডেটা ব্যবহার করা হয়েছে। প্রকৃত প্রতিযোগী এবং বাজারের ডেটা পরে API-এর মাধ্যমে যুক্ত করা যেতে পারে।",
    analyzeRisks: "ব্যবসায়িক ঝুঁকি বিশ্লেষণ করুন",

    riskAnalysis: "ঝুঁকি বিশ্লেষণ",
    aiRiskAnalysis: "AI ঝুঁকি বিশ্লেষণ",
    knowRisks: "বিনিয়োগের আগে ঝুঁকি জানুন।",
    riskDesc:
      "আপনার নির্বাচিত ব্যবসার প্রধান ঝুঁকি এবং সেগুলি পরিচালনার উপায় বুঝুন।",
    overallRisk: "সামগ্রিক ব্যবসায়িক ঝুঁকি",
    manageablePlanning:
      "সতর্ক পরিকল্পনার মাধ্যমে এই ঝুঁকি পরিচালনা করা সম্ভব।",
    marketRisk: "বাজার ঝুঁকি",
    changingDemand: "পরিবর্তনশীল স্থানীয় চাহিদা",
    marketRiskDesc:
      "মৌসুম, দাম এবং স্থানীয় প্রতিযোগিতার কারণে গ্রাহকের চাহিদা পরিবর্তিত হতে পারে।",
    financialRisk: "আর্থিক ঝুঁকি",
    initialInvestment: "প্রাথমিক বিনিয়োগ",
    financialRiskDesc:
      "ব্যবসা শুরু এবং বৃদ্ধি করার সময় পর্যাপ্ত কার্যকরী মূলধন রাখুন।",
    seasonalRisk: "মৌসুমি ঝুঁকি",
    seasonDependentSales: "মৌসুম নির্ভর বিক্রয়",
    seasonalRiskDesc:
      "কিছু ব্যবসায় বিভিন্ন মৌসুমে চাহিদার পরিবর্তন হতে পারে।",
    low: "কম",
    aiSwot: "AI SWOT বিশ্লেষণ",
    businessAtGlance: "আপনার ব্যবসার এক ঝলক",
    strongLocalDemand: "শক্তিশালী স্থানীয় চাহিদা",
    repeatCustomers: "পুনরায় গ্রাহক পাওয়ার সম্ভাবনা",
    manageableScale: "ছোট পরিসরে শুরু করা যায়",
    limitedResources: "সীমিত সম্পদ",
    consistentQuality: "ধারাবাহিক মান বজায় রাখা দরকার",
    limitedMarketReach: "প্রাথমিক বাজারে পৌঁছানো সীমিত",
    growingLocalDemand: "বর্ধমান স্থানীয় চাহিদা",
    digitalMarketing: "ডিজিটাল মার্কেটিংয়ের সুযোগ",
    governmentSupport: "সরকারি সহায়তার সুযোগ",
    newCompetitors: "নতুন প্রতিযোগী",
    priceFluctuations: "দামের ওঠানামা",
    seasonalChanges: "মৌসুমি পরিবর্তন",
    trySimulator: "ব্যবসা সিমুলেটর চেষ্টা করুন",

    businessSimulator: "ব্যবসা সিমুলেটর",
    whatIfSimulator: "ব্যবসা সিমুলেটর",
    testIdea: "বিনিয়োগের আগে আপনার ধারণা পরীক্ষা করুন।",
    simulatorDesc:
      "নিচের সংখ্যাগুলি পরিবর্তন করুন এবং আপনার আনুমানিক ব্যবসায়িক ফলাফল দেখুন।",
    initialInvestment: "প্রাথমিক বিনিয়োগ",
    customersPerDay: "প্রতিদিন গ্রাহক",
    averagePrice: "প্রতি গ্রাহকের গড় মূল্য",
    monthlyExpenses: "মাসিক খরচ",
    monthlyRevenue: "মাসিক আয়",
    monthlyProfit: "মাসিক লাভ",
    yearlyProfit: "বার্ষিক লাভ",
    gramSaarthiInsight: "GramSaarthi তথ্য",
    simulatorNote:
      "এটি আপনার অনুমানের ভিত্তিতে একটি প্রোটোটাইপ হিসাব। প্রকৃত ফল স্থানীয় চাহিদা, মূল্য, পরিচালন খরচ এবং অন্যান্য ব্যবসায়িক পরিস্থিতির উপর নির্ভর করে পরিবর্তিত হতে পারে।",
    planFinances: "আপনার আর্থিক পরিকল্পনা করুন",

    financialPlanner: "আর্থিক পরিকল্পনাকারী",
    smartFinancialPlanning: "স্মার্ট আর্থিক পরিকল্পনা",
    planFunding: "ঋণ নেওয়ার আগে আপনার অর্থের পরিকল্পনা করুন।",
    financeDesc:
      "আপনার আনুমানিক বিনিয়োগ, নিজের অবদান এবং সম্ভাব্য অর্থায়নের প্রয়োজন বুঝুন।",
    estimatedProjectCost: "আনুমানিক প্রকল্প খরচ",
    yourContribution: "আপনার অবদান",
    estimatedFundingGap: "আনুমানিক অর্থের ঘাটতি",
    loanPreview: "ঋণের ঝলক",
    possibleRepayment: "সম্ভাব্য পরিশোধের পরিস্থিতি",
    loanAmount: "ঋণের পরিমাণ",
    interestRate: "সুদের হার",
    tenure: "মেয়াদ",
    scheme: "প্রকল্প",
    moratorium: "মোরাটোরিয়াম",
    estimatedEmi: "আনুমানিক EMI",
    repaymentRoadmap: "পরিশোধের রোডম্যাপ",
    repaymentJourney: "আপনার আনুমানিক পরিশোধের যাত্রা",
    initialMoratorium: "প্রাথমিক মোরাটোরিয়াম",
    repaymentPeriod: "পরিশোধের সময়কাল",
    monthlyEmi: "মাসিক EMI",
    annualEmi: "বার্ষিক EMI",
    illustrative: "উদাহরণমূলক",
    schemeNote:
      "এটি একটি উদাহরণমূলক পরিশোধের হিসাব। প্রকৃত ঋণের শর্ত, সুদ, ভর্তুকি এবং মোরাটোরিয়াম ঋণদাতা ও প্রকল্পের যোগ্যতার উপর নির্ভর করে।",
    downloadReport: "সম্পূর্ণ রিপোর্ট ডাউনলোড করুন",
    downloadCompleteReport: "সম্পূর্ণ রিপোর্ট ডাউনলোড করুন",
    listen: "শুনুন",
    audioLoading: "অডিও তৈরি হচ্ছে...",
    audioNotSupported: "এই ব্রাউজারে ভয়েস আউটপুট সমর্থিত নয়।",
    audioError: "তৈরি অডিও চালানো যায়নি।",
    supportOpportunities: "সহায়তার সুযোগ",
    exploreSupport: "সম্ভাব্য সহায়তা প্রকল্প দেখুন",
    governmentBankSupport: "সরকার / ব্যাংক সহায়তা",
    supportDesc:
      "আপনার অবস্থান, ব্যবসার ধরন এবং যোগ্যতার ভিত্তিতে আপনি সরকারি প্রকল্প, ভর্তুকি বা আনুষ্ঠানিক ঋণ কর্মসূচি দেখতে পারেন।",
    explore: "দেখুন",
    supportNote:
      "প্রকল্পের যোগ্যতা ও উপলব্ধতা সর্বদা সরকারি বা ব্যাংকের সরকারি উৎস থেকে যাচাই করা উচিত।",
    gramSaarthiRecommendation: "GramSaarthi সুপারিশ",
    financeAdvice:
      "সবচেয়ে ব্যবহারিক ছোট বিনিয়োগ দিয়ে শুরু করুন, জরুরি কার্যকরী মূলধন রাখুন এবং ঋণ নেওয়ার আগে আর্থিক বিকল্প তুলনা করুন।",
    generateRoadmap: "আমার ব্যবসার রোডম্যাপ তৈরি করুন",

    yourBusinessRoadmap: "আপনার ব্যবসার রোডম্যাপ",
    personalizedRoadmap: "ব্যক্তিগত রোডম্যাপ",
    pathIdeaAction: "ধারণা থেকে কাজ পর্যন্ত আপনার পথ।",
    roadmapDesc:
      "আপনার দেওয়া তথ্যের ভিত্তিতে এটি একটি সহজ শুরুর পরিকল্পনা।",
    recommendedBusiness: "প্রস্তাবিত ব্যবসা",
    startingPoint: "আপনার শুরুর অবস্থা",
    notSpecified: "উল্লেখ করা হয়নি",
    actionPlan: "৩০ দিনের কর্মপরিকল্পনা",
    startSmall: "ছোট করে শুরু করুন। শিখুন। তারপর বাড়ান।",
    validateDemand: "স্থানীয় চাহিদা যাচাই করুন",
    validateDemandDesc:
      "বড় খরচ করার আগে সম্ভাব্য গ্রাহকদের সঙ্গে কথা বলুন এবং তাদের প্রকৃত প্রয়োজন বুঝুন।",
    smallPilot: "ছোট পাইলট দিয়ে শুরু করুন",
    smallPilotDesc:
      "আপনার পণ্য বা পরিষেবা ছোট পরিসরে পরীক্ষা করুন এবং খরচ ও বিক্রয় নথিভুক্ত করুন।",
    trackNumbers: "আপনার হিসাব রাখুন",
    trackNumbersDesc:
      "শুধু অনুমানের উপর নির্ভর না করে গ্রাহক, আয়, খরচ এবং মাসিক লাভ পর্যবেক্ষণ করুন।",
    scaleCarefully: "সাবধানে বাড়ান",
    scaleCarefullyDesc:
      "লাভ পুনরায় বিনিয়োগ করুন এবং ব্যবসায় ধারাবাহিক চাহিদা দেখা যাওয়ার পর অতিরিক্ত অর্থায়নের কথা ভাবুন।",
    estimatedMonthlyRevenue: "আনুমানিক মাসিক আয়",
    estimatedMonthlyProfit: "আনুমানিক মাসিক লাভ",
    businessRisk: "ব্যবসায়িক ঝুঁকি",
    finalAdvice: "GramSaarthi-এর শেষ পরামর্শ",
    finalAdviceDesc:
      "সবচেয়ে বড় বিনিয়োগ দিয়ে শুরু করবেন না। ব্যবহারিক পাইলট দিয়ে শুরু করুন, চাহিদা যাচাই করুন, খরচ নিয়ন্ত্রণ করুন এবং হিসাব সমর্থন করলে ব্যবসা বাড়ান।",
    backToGramSaarthi: "GramSaarthi-তে ফিরে যান",

    features: "বৈশিষ্ট্য",
    howItWorks: "কীভাবে কাজ করে",
    startAssessment: "মূল্যায়ন শুরু করুন",
    aiPoweredAdvisor: "AI-চালিত গ্রামীণ ব্যবসায়িক পরামর্শদাতা",
    smarterBusiness: "আপনার ধারণাকে আরও স্মার্ট ব্যবসায় পরিণত করুন।",
    heroDesc:
      "GramSaarthi AI গ্রামীণ উদ্যোক্তাদের সঠিক ব্যবসা খুঁজে পেতে, স্থানীয় বাজার বুঝতে, ঝুঁকি পরিচালনা করতে এবং ঋণ নেওয়ার আগে আর্থিক পরিকল্পনা করতে সাহায্য করে।",
    startBusinessAssessment: "ব্যবসায়িক মূল্যায়ন শুরু করুন",
    exploreFeatures: "বৈশিষ্ট্য দেখুন",
    simpleToUse: "ব্যবহার করা সহজ",
    localInsights: "স্থানীয় তথ্য",
    smartFinancialPlanning: "স্মার্ট আর্থিক পরিকল্পনা",
    aiBusinessAdvisor: "AI ব্যবসায়িক পরামর্শদাতা",
    online: "অনলাইন",
    namaste: "নমস্তে!",
    askGramSaarthi: "GramSaarthi-কে জিজ্ঞাসা করুন...",
    whatWeOffer: "আমরা কী দিই",
    everythingBeforeInvest: "বিনিয়োগের আগে আপনার প্রয়োজনীয় সবকিছু।",
    aiBusinessMatching: "AI ব্যবসা মিল",
    aiBusinessMatchingDesc:
      "আপনার মূলধন, দক্ষতা, সম্পদ এবং স্থানীয় সুযোগের সঙ্গে মানানসই ব্যবসা খুঁজুন।",
    localMarketAnalysis: "স্থানীয় বাজার বিশ্লেষণ",
    localMarketAnalysisDesc:
      "আপনার গ্রামের আশেপাশের চাহিদা, প্রতিযোগিতা এবং বাজারের সুযোগ বুঝুন।",
    businessSimulatorDesc:
      "টাকা বিনিয়োগের আগে বিভিন্ন দাম, গ্রাহক এবং খরচ পরীক্ষা করুন।",
    smartFinancialPlanningDesc:
      "আপনার প্রকল্পের খরচ, সম্ভাব্য অর্থায়ন এবং পরিশোধ পরিকল্পনা বুঝুন।",
    howItWorksTitle: "কীভাবে কাজ করে",
    fourSteps: "ধারণা থেকে কাজে ৪টি সহজ ধাপ।",
    tellUsAboutYou: "আপনার সম্পর্কে বলুন",
    tellUsAboutYouDesc:
      "আপনার অবস্থান, মূলধন, দক্ষতা এবং সম্পদ শেয়ার করুন।",
    discoverOpportunities: "সুযোগ খুঁজুন",
    discoverOpportunitiesDesc:
      "আমাদের সিস্টেম উপযুক্ত স্থানীয় ব্যবসায়িক সুযোগ বিশ্লেষণ করে।",
    testYourIdea: "আপনার ধারণা পরীক্ষা করুন",
    testYourIdeaDesc:
      "লাভ, ঝুঁকি এবং বিভিন্ন ব্যবসায়িক পরিস্থিতির সিমুলেশন করুন।",
    planWithConfidence: "আত্মবিশ্বাসের সঙ্গে পরিকল্পনা করুন",
    planWithConfidenceDesc:
      "আপনার ব্যক্তিগত ব্যবসা ও আর্থিক রোডম্যাপ পান।",
    footerText:
      "গ্রামীণ স্তরে আরও স্মার্ট উদ্যোক্তাকে শক্তিশালী করা।",

    dairyBusiness: "দুগ্ধ ব্যবসা",
    groceryStore: "মুদি দোকান",
    tailoringBusiness: "সেলাই ব্যবসা",
    poultryBusiness: "পোল্ট্রি ব্যবসা",
    foodProcessing: "খাদ্য প্রক্রিয়াকরণ",
    smallGroceryStore: "ছোট মুদি দোকান",
    dairyReason:
      "স্থানীয় চাহিদা ও সম্পদ থাকলে দুগ্ধ ব্যবসায় ভালো সম্ভাবনা রয়েছে।",
    groceryReason:
      "মুদি ব্যবসা স্থানীয় পরিবারের নিয়মিত চাহিদা থেকে উপকৃত হতে পারে।",
    tailoringReason:
      "সেলাই ব্যবসা তুলনামূলক কম প্রাথমিক বিনিয়োগে এবং দক্ষতাভিত্তিক কাজ দিয়ে শুরু করা যায়।",
    poultryReason:
      "পোল্ট্রিতে ভালো স্থানীয় চাহিদা থাকতে পারে, তবে খরচ ও স্বাস্থ্য ব্যবস্থাপনা গুরুত্বপূর্ণ।",
    foodProcessingReason:
      "স্থানীয় খাদ্য প্রক্রিয়াকরণ কৃষি পণ্য থেকে মূল্য তৈরি করতে পারে এবং কাছাকাছি বাজারে পরিষেবা দিতে পারে।",
    smallGroceryReason:
      "ছোট মুদি দোকান স্থানীয় মানুষের দৈনন্দিন প্রয়োজন পূরণ করতে পারে।",
    microFinance: "মাইক্রো ফাইন্যান্স",
    termLoan: "টার্ম লোন",
    aiAnalysisFailed: "AI বিশ্লেষণ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
    backendError:
      "GramSaarthi AI-এর সঙ্গে সংযোগ করা যায়নি। অনুগ্রহ করে backend চালু আছে কিনা নিশ্চিত করুন।",
    aiReportError:
      "AI রিপোর্ট দেখানো যায়নি। অনুগ্রহ করে আবার বিশ্লেষণ করুন।",
  },

  Tamil: {
    step1: "படி 1 / 3",
    assessment: "வணிக மதிப்பீடு",
    tellSituation: "உங்கள் நிலைமையைப் பற்றி கூறுங்கள்.",
    assessmentDesc:
      "உங்கள் வளங்கள் மற்றும் உள்ளூர் சந்தைக்கு ஏற்ற வணிக வாய்ப்புகளைக் கண்டறிய இந்தத் தகவலைப் பயன்படுத்துவோம்.",
    location: "நீங்கள் எங்கு வணிகத்தைத் தொடங்க விரும்புகிறீர்கள்?",
    locationPlaceholder: "கிராமம் / நகரம் உள்ளிடவும்",
    capital: "உங்களிடம் எவ்வளவு சொந்த மூலதனம் உள்ளது?",
    capitalPlaceholder: "உதாரணம்: ₹80,000",
    language: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    skills: "உங்களிடம் என்ன திறன்கள் அல்லது அனுபவம் உள்ளது?",
    skillsPlaceholder: "உதாரணம்: விவசாயம், தையல், சமையல்...",
    resources: "உங்களிடம் ஏற்கனவே என்ன வளங்கள் உள்ளன?",
    resourcesPlaceholder: "உதாரணம்: நிலம், கடை, கால்நடைகள்...",
    businessIdea: "உங்களிடம் ஏற்கனவே வணிக யோசனை உள்ளதா?",
    selectBusiness: "வணிகத்தைத் தேர்ந்தெடுக்கவும்",
    continue: "தொடரவும்",

    assessmentComplete: "மதிப்பீடு முடிந்தது",
    businessMatch: "உங்கள் வணிகப் பொருத்தம்",
    found: "நாங்கள் இதைக் கண்டறிந்தோம்.",
    matchDesc:
      "உங்கள் தகவலின் அடிப்படையில் இந்த வணிகங்கள் உங்கள் நிலைமைக்கு ஏற்றதாக இருக்கலாம்.",
    recommended: "#1 பரிந்துரை",
    matchScore: "பொருத்த மதிப்பெண்",
    marketReach: "சந்தை சென்றடைவு",
    primaryCustomers: "முக்கிய வாடிக்கையாளர்கள்",
    distributionChannels: "விநியோக வழிகள்",
    opportunity: "வாய்ப்பு பகுப்பாய்வு",
    swot: "SWOT பகுப்பாய்வு",
    localDemand: "உள்ளூர் தேவை",
    capitalFit: "மூலதனப் பொருத்தம்",
    resourceFit: "வளப் பொருத்தம்",
    risk: "ஆபத்து",
    exploreBusiness: "வணிகத்தைப் பார்க்கவும்",
    strengths: "வலிமைகள்",
    weaknesses: "பலவீனங்கள்",
    opportunities: "வாய்ப்புகள்",
    threats: "அச்சுறுத்தல்கள்",
    localThreats: "உள்ளூர் அச்சுறுத்தல்கள்",
    competitors: "போட்டியாளர் பகுப்பாய்வு",
    mainCompetitors: "முக்கிய போட்டியாளர்கள்",
    competitiveAdvantage: "உங்கள் போட்டி முன்னிலை",
    pricing: "விலை நிர்ணய உத்தி",
    strategy: "உத்தி:",
    suggestedPricing: "பரிந்துரைக்கப்பட்ட விலை:",
    why: "ஏன்:",
    recommendation: "GramSaarthi பரிந்துரை",
    recommendedSteps: "பரிந்துரைக்கப்பட்ட படிகள்",

    marketAnalysis: "சந்தை பகுப்பாய்வு",
    hyperLocalMarket: "உள்ளூர் சந்தை பகுப்பாய்வு",
    understandMarket: "உங்கள் உள்ளூர் சந்தையைப் புரிந்துகொள்ளுங்கள்.",
    marketDesc:
      "நீங்கள் தேர்ந்தெடுத்த இடத்தைச் சுற்றியுள்ள வாய்ப்புகளின் டெமோ பகுப்பாய்வு இது.",
    yourVillage: "உங்கள் கிராமம்",
    localMarketArea: "உள்ளூர் சந்தைப் பகுதி",
    estimatedDemand: "மதிப்பிடப்பட்ட தேவை",
    high: "அதிகம்",
    competition: "போட்டி",
    medium: "நடுத்தரம்",
    growthPotential: "வளர்ச்சி வாய்ப்பு",
    strong: "வலுவான",
    seasonalDemand: "பருவகால தேவை",
    whenDemandHighest: "தேவை எப்போது அதிகமாக இருக்கும்?",
    demoData: "டெமோ தரவு",
    summer: "கோடை",
    monsoon: "மழைக்காலம்",
    winter: "குளிர்காலம்",
    festival: "திருவிழா",
    competitorMap: "போட்டியாளர் வரைபடம்",
    nearbyBusinessActivity: "அருகிலுள்ள வணிக செயல்பாடு",
    illustrative: "விளக்கமான",
    localMarketRadius: "5–10 கிமீ உள்ளூர் சந்தை",
    yourLocation: "உங்கள் இடம்",
    mapNote:
      "இந்த முன்மாதிரி விளக்கமான தரவைப் பயன்படுத்துகிறது. உண்மையான போட்டியாளர் மற்றும் சந்தை தரவை பின்னர் API மூலம் இணைக்கலாம்.",
    analyzeRisks: "வணிக அபாயங்களை பகுப்பாய்வு செய்யவும்",

    riskAnalysis: "ஆபத்து பகுப்பாய்வு",
    aiRiskAnalysis: "AI ஆபத்து பகுப்பாய்வு",
    knowRisks: "முதலீடு செய்வதற்கு முன் ஆபத்துகளை அறிந்து கொள்ளுங்கள்.",
    riskDesc:
      "நீங்கள் தேர்ந்தெடுத்த வணிகத்துடன் தொடர்புடைய முக்கிய ஆபத்துகளையும் அவற்றை நிர்வகிக்கும் வழிகளையும் புரிந்துகொள்ளுங்கள்.",
    overallRisk: "மொத்த வணிக ஆபத்து",
    manageablePlanning:
      "கவனமான திட்டமிடலுடன் இந்த ஆபத்து நிலையை நிர்வகிக்கலாம்.",
    marketRisk: "சந்தை ஆபத்து",
    changingDemand: "மாறும் உள்ளூர் தேவை",
    marketRiskDesc:
      "பருவங்கள், விலைகள் மற்றும் உள்ளூர் போட்டியின் காரணமாக வாடிக்கையாளர் தேவை மாறலாம்.",
    financialRisk: "நிதி ஆபத்து",
    initialInvestment: "ஆரம்ப முதலீடு",
    financialRiskDesc:
      "வணிகத்தைத் தொடங்கும்போதும் வளர்க்கும்போதும் போதுமான செயல்பாட்டு மூலதனத்தை வைத்திருங்கள்.",
    seasonalRisk: "பருவகால ஆபத்து",
    seasonDependentSales: "பருவத்தைச் சார்ந்த விற்பனை",
    seasonalRiskDesc:
      "சில வணிகங்களில் வெவ்வேறு பருவங்களில் தேவை மாறலாம்.",
    low: "குறைவு",
    aiSwot: "AI SWOT பகுப்பாய்வு",
    businessAtGlance: "உங்கள் வணிகத்தின் ஒரு பார்வை",
    strongLocalDemand: "வலுவான உள்ளூர் தேவை",
    repeatCustomers: "மீண்டும் வரும் வாடிக்கையாளர்களுக்கான வாய்ப்பு",
    manageableScale: "சிறிய அளவில் தொடங்கலாம்",
    limitedResources: "வரையறுக்கப்பட்ட வளங்கள்",
    consistentQuality: "தொடர்ச்சியான தரத்தை பராமரிக்க வேண்டும்",
    limitedMarketReach: "ஆரம்ப சந்தை சென்றடைவு குறைவு",
    growingLocalDemand: "வளரும் உள்ளூர் தேவை",
    digitalMarketing: "டிஜிட்டல் மார்க்கெட்டிங் வாய்ப்புகள்",
    governmentSupport: "அரசு உதவி வாய்ப்புகள்",
    newCompetitors: "புதிய போட்டியாளர்கள்",
    priceFluctuations: "விலை ஏற்ற இறக்கம்",
    seasonalChanges: "பருவகால மாற்றங்கள்",
    trySimulator: "வணிக சிமுலேட்டரை முயற்சிக்கவும்",

    businessSimulator: "வணிக சிமுலேட்டர்",
    whatIfSimulator: "வணிக சிமுலேட்டர்",
    testIdea: "முதலீடு செய்வதற்கு முன் உங்கள் யோசனையைச் சோதிக்கவும்.",
    simulatorDesc:
      "கீழே உள்ள எண்களை மாற்றி உங்கள் மதிப்பிடப்பட்ட வணிக செயல்திறன் எப்படி மாறுகிறது என்பதைப் பாருங்கள்.",
    initialInvestment: "ஆரம்ப முதலீடு",
    customersPerDay: "ஒரு நாளின் வாடிக்கையாளர்கள்",
    averagePrice: "ஒரு வாடிக்கையாளருக்கான சராசரி விலை",
    monthlyExpenses: "மாதாந்திர செலவுகள்",
    monthlyRevenue: "மாதாந்திர வருவாய்",
    monthlyProfit: "மாதாந்திர லாபம்",
    yearlyProfit: "வருடாந்திர லாபம்",
    gramSaarthiInsight: "GramSaarthi தகவல்",
    simulatorNote:
      "இது உங்கள் அனுமானங்களை அடிப்படையாகக் கொண்ட முன்மாதிரி மதிப்பீடு. உண்மையான முடிவுகள் உள்ளூர் தேவை, விலை, செயல்பாட்டு செலவுகள் மற்றும் பிற வணிக சூழ்நிலைகளுக்கு ஏற்ப மாறலாம்.",
    planFinances: "உங்கள் நிதியைத் திட்டமிடுங்கள்",

    financialPlanner: "நிதி திட்டமிடுபவர்",
    smartFinancialPlanning: "ஸ்மார்ட் நிதி திட்டமிடல்",
    planFunding: "கடன் பெறுவதற்கு முன் உங்கள் நிதியைத் திட்டமிடுங்கள்.",
    financeDesc:
      "மதிப்பிடப்பட்ட முதலீடு, உங்கள் பங்களிப்பு மற்றும் சாத்தியமான நிதித் தேவையைப் புரிந்துகொள்ளுங்கள்.",
    estimatedProjectCost: "மதிப்பிடப்பட்ட திட்டச் செலவு",
    yourContribution: "உங்கள் பங்களிப்பு",
    estimatedFundingGap: "மதிப்பிடப்பட்ட நிதி இடைவெளி",
    loanPreview: "கடன் பார்வை",
    possibleRepayment: "சாத்தியமான திருப்பிச் செலுத்தும் நிலை",
    loanAmount: "கடன் தொகை",
    interestRate: "வட்டி விகிதம்",
    tenure: "காலம்",
    scheme: "திட்டம்",
    moratorium: "தவணை ஒத்திவைப்பு",
    estimatedEmi: "மதிப்பிடப்பட்ட EMI",
    repaymentRoadmap: "திருப்பிச் செலுத்தும் பாதை",
    repaymentJourney: "உங்கள் மதிப்பிடப்பட்ட திருப்பிச் செலுத்தும் பயணம்",
    initialMoratorium: "ஆரம்ப தவணை ஒத்திவைப்பு",
    repaymentPeriod: "திருப்பிச் செலுத்தும் காலம்",
    monthlyEmi: "மாதாந்திர EMI",
    annualEmi: "வருடாந்திர EMI",
    illustrative: "விளக்கமான",
    schemeNote:
      "இது ஒரு விளக்கமான திருப்பிச் செலுத்தும் மதிப்பீடு. உண்மையான கடன் விதிமுறைகள், வட்டி, மானியம் மற்றும் தவணை ஒத்திவைப்பு கடன் வழங்குநர் மற்றும் திட்டத் தகுதியைப் பொறுத்தது.",
    downloadReport: "முழு அறிக்கையைப் பதிவிறக்கவும்",
    downloadCompleteReport: "முழு அறிக்கையைப் பதிவிறக்கவும்",
    listen: "கேளுங்கள்",
    audioLoading: "ஆடியோ உருவாக்கப்படுகிறது...",
    audioNotSupported: "இந்த உலாவியில் குரல் வெளியீடு ஆதரிக்கப்படவில்லை.",
    audioError: "உருவாக்கப்பட்ட ஆடியோவை இயக்க முடியவில்லை.",
    supportOpportunities: "ஆதரவு வாய்ப்புகள்",
    exploreSupport: "சாத்தியமான ஆதரவு திட்டங்களைப் பார்க்கவும்",
    governmentBankSupport: "அரசு / வங்கி ஆதரவு",
    supportDesc:
      "உங்கள் இடம், வணிக வகை மற்றும் தகுதியைப் பொறுத்து அரசு திட்டங்கள், மானியங்கள் அல்லது முறையான கடன் திட்டங்களைப் பார்க்கலாம்.",
    explore: "பார்க்கவும்",
    supportNote:
      "திட்டத் தகுதி மற்றும் கிடைக்கும் தன்மையை அதிகாரப்பூர்வ அரசு அல்லது வங்கி ஆதாரங்களில் சரிபார்க்க வேண்டும்.",
    gramSaarthiRecommendation: "GramSaarthi பரிந்துரை",
    financeAdvice:
      "சிறிய நடைமுறை முதலீட்டில் தொடங்குங்கள், அவசர செயல்பாட்டு மூலதனத்தை வைத்திருங்கள் மற்றும் கடன் பெறுவதற்கு முன் நிதி விருப்பங்களை ஒப்பிடுங்கள்.",
    generateRoadmap: "என் வணிக பாதையை உருவாக்கவும்",

    yourBusinessRoadmap: "உங்கள் வணிக பாதை",
    personalizedRoadmap: "தனிப்பட்ட பாதை",
    pathIdeaAction: "யோசனையிலிருந்து செயல்பாட்டிற்கான உங்கள் பாதை.",
    roadmapDesc:
      "நீங்கள் வழங்கிய தகவலின் அடிப்படையில் இது ஒரு எளிய தொடக்கத் திட்டம்.",
    recommendedBusiness: "பரிந்துரைக்கப்பட்ட வணிகம்",
    startingPoint: "உங்கள் தொடக்க நிலை",
    notSpecified: "குறிப்பிடப்படவில்லை",
    actionPlan: "30 நாள் செயல்திட்டம்",
    startSmall: "சிறியதாக தொடங்குங்கள். கற்றுக்கொள்ளுங்கள். பின்னர் வளருங்கள்.",
    validateDemand: "உள்ளூர் தேவையைச் சரிபார்க்கவும்",
    validateDemandDesc:
      "அதிகமாக செலவழிப்பதற்கு முன் சாத்தியமான வாடிக்கையாளர்களுடன் பேசி அவர்களுக்கு உண்மையில் என்ன தேவை என்பதைப் புரிந்துகொள்ளுங்கள்.",
    smallPilot: "சிறிய முயற்சியுடன் தொடங்குங்கள்",
    smallPilotDesc:
      "உங்கள் தயாரிப்பு அல்லது சேவையை சிறிய அளவில் சோதித்து செலவு மற்றும் விற்பனையை பதிவு செய்யுங்கள்.",
    trackNumbers: "உங்கள் எண்ணிக்கைகளை கண்காணிக்கவும்",
    trackNumbersDesc:
      "அனுமானங்களை மட்டும் நம்பாமல் வாடிக்கையாளர்கள், வருவாய், செலவுகள் மற்றும் மாதாந்திர லாபத்தை கண்காணிக்கவும்.",
    scaleCarefully: "கவனமாக வளருங்கள்",
    scaleCarefullyDesc:
      "லாபத்தை மீண்டும் முதலீடு செய்து, வணிகத்தில் தொடர்ச்சியான தேவை தெரிந்த பிறகு மட்டுமே கூடுதல் நிதியைப் பரிசீலிக்கவும்.",
    estimatedMonthlyRevenue: "மதிப்பிடப்பட்ட மாதாந்திர வருவாய்",
    estimatedMonthlyProfit: "மதிப்பிடப்பட்ட மாதாந்திர லாபம்",
    businessRisk: "வணிக ஆபத்து",
    finalAdvice: "GramSaarthi இறுதி ஆலோசனை",
    finalAdviceDesc:
      "மிகப்பெரிய முதலீட்டுடன் தொடங்க வேண்டாம். நடைமுறை முயற்சியுடன் தொடங்கி, தேவையைச் சரிபார்த்து, செலவுகளைக் கட்டுப்படுத்தி, எண்ணிக்கைகள் ஆதரிக்கும் போது வளருங்கள்.",
    backToGramSaarthi: "GramSaarthi-க்கு திரும்பவும்",

    features: "அம்சங்கள்",
    howItWorks: "இது எப்படி வேலை செய்கிறது",
    startAssessment: "மதிப்பீட்டைத் தொடங்கவும்",
    aiPoweredAdvisor: "AI இயங்கும் கிராமப்புற வணிக ஆலோசகர்",
    smarterBusiness: "உங்கள் யோசனையை சிறந்த வணிகமாக மாற்றுங்கள்.",
    heroDesc:
      "GramSaarthi AI கிராமப்புற தொழில்முனைவோருக்கு சரியான வணிகத்தைக் கண்டறியவும், உள்ளூர் சந்தையைப் புரிந்துகொள்ளவும், ஆபத்துகளை நிர்வகிக்கவும் மற்றும் கடன் பெறுவதற்கு முன் நிதித் திட்டமிடவும் உதவுகிறது.",
    startBusinessAssessment: "வணிக மதிப்பீட்டைத் தொடங்கவும்",
    exploreFeatures: "அம்சங்களைப் பார்க்கவும்",
    simpleToUse: "பயன்படுத்த எளிதானது",
    localInsights: "உள்ளூர் தகவல்கள்",
    smartFinancialPlanning: "ஸ்மார்ட் நிதி திட்டமிடல்",
    aiBusinessAdvisor: "AI வணிக ஆலோசகர்",
    online: "ஆன்லைன்",
    namaste: "வணக்கம்!",
    askGramSaarthi: "GramSaarthi-யிடம் கேளுங்கள்...",
    whatWeOffer: "நாங்கள் வழங்குவது",
    everythingBeforeInvest: "முதலீடு செய்வதற்கு முன் உங்களுக்குத் தேவையான அனைத்தும்.",
    aiBusinessMatching: "AI வணிக பொருத்தம்",
    aiBusinessMatchingDesc:
      "உங்கள் மூலதனம், திறன்கள், வளங்கள் மற்றும் உள்ளூர் வாய்ப்புகளுடன் பொருந்தும் வணிகங்களைக் கண்டறியுங்கள்.",
    localMarketAnalysis: "உள்ளூர் சந்தை பகுப்பாய்வு",
    localMarketAnalysisDesc:
      "உங்கள் கிராமத்தைச் சுற்றியுள்ள தேவை, போட்டி மற்றும் சந்தை வாய்ப்புகளைப் புரிந்துகொள்ளுங்கள்.",
    businessSimulatorDesc:
      "பணம் முதலீடு செய்வதற்கு முன் வெவ்வேறு விலைகள், வாடிக்கையாளர்கள் மற்றும் செலவுகளைச் சோதிக்கவும்.",
    smartFinancialPlanningDesc:
      "திட்டச் செலவு, சாத்தியமான நிதி மற்றும் திருப்பிச் செலுத்தும் திட்டத்தைப் புரிந்துகொள்ளுங்கள்.",
    howItWorksTitle: "இது எப்படி வேலை செய்கிறது",
    fourSteps: "யோசனையிலிருந்து செயல்பாட்டிற்கு 4 எளிய படிகள்.",
    tellUsAboutYou: "உங்களைப் பற்றி கூறுங்கள்",
    tellUsAboutYouDesc:
      "உங்கள் இடம், மூலதனம், திறன்கள் மற்றும் வளங்களைப் பகிருங்கள்.",
    discoverOpportunities: "வாய்ப்புகளைக் கண்டறியுங்கள்",
    discoverOpportunitiesDesc:
      "எங்கள் அமைப்பு பொருத்தமான உள்ளூர் வணிக வாய்ப்புகளை பகுப்பாய்வு செய்கிறது.",
    testYourIdea: "உங்கள் யோசனையைச் சோதிக்கவும்",
    testYourIdeaDesc:
      "லாபம், ஆபத்துகள் மற்றும் பல்வேறு வணிக சூழ்நிலைகளை உருவகப்படுத்துங்கள்.",
    planWithConfidence: "நம்பிக்கையுடன் திட்டமிடுங்கள்",
    planWithConfidenceDesc:
      "உங்கள் தனிப்பட்ட வணிக மற்றும் நிதி பாதையைப் பெறுங்கள்.",
    footerText:
      "கிராமப்புற அளவில் சிறந்த தொழில்முனைவோரை வலுப்படுத்துதல்.",

    dairyBusiness: "பால் பண்ணை வணிகம்",
    groceryStore: "மளிகைக் கடை",
    tailoringBusiness: "தையல் வணிகம்",
    poultryBusiness: "கோழிப்பண்ணை வணிகம்",
    foodProcessing: "உணவு பதப்படுத்துதல்",
    smallGroceryStore: "சிறிய மளிகைக் கடை",
    dairyReason:
      "உள்ளூர் தேவை மற்றும் வளங்கள் இருந்தால் பால் பண்ணை நல்ல வாய்ப்பைக் கொண்டுள்ளது.",
    groceryReason:
      "மளிகை வணிகம் உள்ளூர் குடும்பங்களின் வழக்கமான தேவையிலிருந்து பயனடையலாம்.",
    tailoringReason:
      "தையல் வணிகத்தை குறைந்த ஆரம்ப முதலீட்டிலும் திறன் அடிப்படையிலும் தொடங்கலாம்.",
    poultryReason:
      "கோழிப்பண்ணைக்கு நல்ல உள்ளூர் தேவை இருக்கலாம், ஆனால் செலவு மற்றும் ஆரோக்கியத்தை கவனமாக நிர்வகிக்க வேண்டும்.",
    foodProcessingReason:
      "உள்ளூர் உணவு பதப்படுத்துதல் விவசாயப் பொருட்களுக்கு மதிப்பு சேர்த்து அருகிலுள்ள சந்தைகளுக்கு சேவை செய்யலாம்.",
    smallGroceryReason:
      "சிறிய மளிகைக் கடை உள்ளூர் சமூகத்தின் அன்றாட தேவைகளைப் பூர்த்தி செய்யலாம்.",
    microFinance: "மைக்ரோ ஃபைனான்ஸ்",
    termLoan: "டெர்ம் லோன்",
    aiAnalysisFailed: "AI பகுப்பாய்வு தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.",
    backendError:
      "GramSaarthi AI-யுடன் இணைக்க முடியவில்லை. backend இயங்குகிறதா என்பதை உறுதிப்படுத்தவும்.",
    aiReportError:
      "AI அறிக்கையைக் காட்ட முடியவில்லை. மீண்டும் பகுப்பாய்வு செய்யவும்.",
  },

  Telugu: {
    step1: "దశ 1 / 3",
    assessment: "వ్యాపార అంచనా",
    tellSituation: "మీ పరిస్థితి గురించి చెప్పండి.",
    assessmentDesc:
      "మీ వనరులు మరియు స్థానిక మార్కెట్‌కు సరిపోయే వ్యాపార అవకాశాలను కనుగొనడానికి ఈ సమాచారాన్ని ఉపయోగిస్తాము.",
    location: "మీరు ఎక్కడ వ్యాపారం ప్రారంభించాలనుకుంటున్నారు?",
    locationPlaceholder: "గ్రామం / పట్టణం నమోదు చేయండి",
    capital: "మీ వద్ద ఎంత స్వంత మూలధనం ఉంది?",
    capitalPlaceholder: "ఉదాహరణ: ₹80,000",
    language: "మీ భాషను ఎంచుకోండి",
    skills: "మీ వద్ద ఏ నైపుణ్యాలు లేదా అనుభవం ఉన్నాయి?",
    skillsPlaceholder: "ఉదాహరణ: వ్యవసాయం, కుట్టుపని, వంట...",
    resources: "మీ వద్ద ఇప్పటికే ఏ వనరులు ఉన్నాయి?",
    resourcesPlaceholder: "ఉదాహరణ: భూమి, దుకాణం, పశువులు...",
    businessIdea: "మీకు ఇప్పటికే వ్యాపార ఆలోచన ఉందా?",
    selectBusiness: "వ్యాపారాన్ని ఎంచుకోండి",
    continue: "కొనసాగించండి",

    assessmentComplete: "అంచనా పూర్తయింది",
    businessMatch: "మీ వ్యాపార సరిపోలిక",
    found: "మేము దీనిని కనుగొన్నాము.",
    matchDesc:
      "మీ సమాచారం ఆధారంగా ఈ వ్యాపారాలు మీ పరిస్థితికి సరిపోవచ్చు.",
    recommended: "#1 సిఫార్సు",
    matchScore: "సరిపోలిక స్కోర్",
    marketReach: "మార్కెట్ చేరువ",
    primaryCustomers: "ప్రధాన కస్టమర్లు",
    distributionChannels: "పంపిణీ మార్గాలు",
    opportunity: "అవకాశ విశ్లేషణ",
    swot: "SWOT విశ్లేషణ",
    localDemand: "స్థానిక డిమాండ్",
    capitalFit: "మూలధన అనుకూలత",
    resourceFit: "వనరుల అనుకూలత",
    risk: "ప్రమాదం",
    exploreBusiness: "వ్యాపారాన్ని చూడండి",
    strengths: "బలాలు",
    weaknesses: "బలహీనతలు",
    opportunities: "అవకాశాలు",
    threats: "ముప్పులు",
    localThreats: "స్థానిక ముప్పులు",
    competitors: "పోటీదారుల విశ్లేషణ",
    mainCompetitors: "ప్రధాన పోటీదారులు",
    competitiveAdvantage: "మీ పోటీ ప్రయోజనం",
    pricing: "ధర నిర్ణయ వ్యూహం",
    strategy: "వ్యూహం:",
    suggestedPricing: "సూచించిన ధర:",
    why: "ఎందుకు:",
    recommendation: "GramSaarthi సిఫార్సు",
    recommendedSteps: "సిఫార్సు చేసిన దశలు",

    marketAnalysis: "మార్కెట్ విశ్లేషణ",
    hyperLocalMarket: "స్థానిక మార్కెట్ విశ్లేషణ",
    understandMarket: "మీ స్థానిక మార్కెట్‌ను అర్థం చేసుకోండి.",
    marketDesc:
      "మీరు ఎంచుకున్న ప్రదేశం చుట్టూ ఉన్న అవకాశాల డెమో విశ్లేషణ ఇది.",
    yourVillage: "మీ గ్రామం",
    localMarketArea: "స్థానిక మార్కెట్ ప్రాంతం",
    estimatedDemand: "అంచనా డిమాండ్",
    high: "అధికం",
    competition: "పోటీ",
    medium: "మధ్యస్థం",
    growthPotential: "వృద్ధి అవకాశం",
    strong: "బలమైన",
    seasonalDemand: "కాలానుగుణ డిమాండ్",
    whenDemandHighest: "డిమాండ్ ఎప్పుడు ఎక్కువగా ఉంటుంది?",
    demoData: "డెమో డేటా",
    summer: "వేసవి",
    monsoon: "వర్షాకాలం",
    winter: "చలికాలం",
    festival: "పండుగ",
    competitorMap: "పోటీదారుల మ్యాప్",
    nearbyBusinessActivity: "సమీప వ్యాపార కార్యకలాపాలు",
    illustrative: "ఉదాహరణాత్మక",
    localMarketRadius: "5–10 కి.మీ స్థానిక మార్కెట్",
    yourLocation: "మీ స్థానం",
    mapNote:
      "ఈ ప్రోటోటైప్ ఉదాహరణాత్మక డేటాను ఉపయోగిస్తుంది. నిజమైన పోటీదారులు మరియు మార్కెట్ డేటాను తర్వాత API ద్వారా జోడించవచ్చు.",
    analyzeRisks: "వ్యాపార ప్రమాదాలను విశ్లేషించండి",

    riskAnalysis: "ప్రమాద విశ్లేషణ",
    aiRiskAnalysis: "AI ప్రమాద విశ్లేషణ",
    knowRisks: "పెట్టుబడి పెట్టే ముందు ప్రమాదాలను తెలుసుకోండి.",
    riskDesc:
      "మీరు ఎంచుకున్న వ్యాపారానికి సంబంధించిన ప్రధాన ప్రమాదాలను మరియు వాటిని నిర్వహించే మార్గాలను అర్థం చేసుకోండి.",
    overallRisk: "మొత్తం వ్యాపార ప్రమాదం",
    manageablePlanning:
      "జాగ్రత్తగా ప్రణాళికతో ఈ ప్రమాద స్థాయిని నిర్వహించవచ్చు.",
    marketRisk: "మార్కెట్ ప్రమాదం",
    changingDemand: "మారుతున్న స్థానిక డిమాండ్",
    marketRiskDesc:
      "కాలాలు, ధరలు మరియు స్థానిక పోటీ కారణంగా కస్టమర్ డిమాండ్ మారవచ్చు.",
    financialRisk: "ఆర్థిక ప్రమాదం",
    initialInvestment: "ప్రారంభ పెట్టుబడి",
    financialRiskDesc:
      "వ్యాపారాన్ని ప్రారంభించేటప్పుడు మరియు పెంచేటప్పుడు తగిన పని మూలధనాన్ని ఉంచండి.",
    seasonalRisk: "కాలానుగుణ ప్రమాదం",
    seasonDependentSales: "కాలంపై ఆధారపడిన అమ్మకాలు",
    seasonalRiskDesc:
      "కొన్ని వ్యాపారాల్లో వివిధ కాలాల్లో డిమాండ్ మారవచ్చు.",
    low: "తక్కువ",
    aiSwot: "AI SWOT విశ్లేషణ",
    businessAtGlance: "మీ వ్యాపారం ఒక చూపులో",
    strongLocalDemand: "బలమైన స్థానిక డిమాండ్",
    repeatCustomers: "మళ్లీ వచ్చే కస్టమర్ల అవకాశం",
    manageableScale: "చిన్న స్థాయిలో ప్రారంభించవచ్చు",
    limitedResources: "పరిమిత వనరులు",
    consistentQuality: "నిరంతర నాణ్యతను కాపాడాలి",
    limitedMarketReach: "ప్రారంభ మార్కెట్ చేరువ పరిమితం",
    growingLocalDemand: "పెరుగుతున్న స్థానిక డిమాండ్",
    digitalMarketing: "డిజిటల్ మార్కెటింగ్ అవకాశాలు",
    governmentSupport: "ప్రభుత్వ సహాయ అవకాశాలు",
    newCompetitors: "కొత్త పోటీదారులు",
    priceFluctuations: "ధరల మార్పులు",
    seasonalChanges: "కాలానుగుణ మార్పులు",
    trySimulator: "వ్యాపార సిమ్యులేటర్ ప్రయత్నించండి",

    businessSimulator: "వ్యాపార సిమ్యులేటర్",
    whatIfSimulator: "వ్యాపార సిమ్యులేటర్",
    testIdea: "పెట్టుబడి పెట్టే ముందు మీ ఆలోచనను పరీక్షించండి.",
    simulatorDesc:
      "క్రింది సంఖ్యలను మార్చి మీ అంచనా వ్యాపార పనితీరు ఎలా మారుతుందో చూడండి.",
    initialInvestment: "ప్రారంభ పెట్టుబడి",
    customersPerDay: "రోజుకు కస్టమర్లు",
    averagePrice: "ప్రతి కస్టమర్ సగటు ధర",
    monthlyExpenses: "నెలవారీ ఖర్చులు",
    monthlyRevenue: "నెలవారీ ఆదాయం",
    monthlyProfit: "నెలవారీ లాభం",
    yearlyProfit: "వార్షిక లాభం",
    gramSaarthiInsight: "GramSaarthi సమాచారం",
    simulatorNote:
      "ఇది మీ అంచనాల ఆధారంగా రూపొందించిన ప్రోటోటైప్ అంచనా. నిజమైన ఫలితాలు స్థానిక డిమాండ్, ధరలు, నిర్వహణ ఖర్చులు మరియు ఇతర పరిస్థితులపై ఆధారపడి మారవచ్చు.",
    planFinances: "మీ ఆర్థిక ప్రణాళికను రూపొందించండి",

    financialPlanner: "ఆర్థిక ప్రణాళికకర్త",
    smartFinancialPlanning: "స్మార్ట్ ఆర్థిక ప్రణాళిక",
    planFunding: "రుణం తీసుకునే ముందు మీ నిధులను ప్లాన్ చేయండి.",
    financeDesc:
      "మీ అంచనా పెట్టుబడి, స్వంత సహకారం మరియు సంభావ్య ఆర్థిక అవసరాన్ని అర్థం చేసుకోండి.",
    estimatedProjectCost: "అంచనా ప్రాజెక్ట్ ఖర్చు",
    yourContribution: "మీ సహకారం",
    estimatedFundingGap: "అంచనా నిధుల లోటు",
    loanPreview: "రుణం అవలోకనం",
    possibleRepayment: "సంభావ్య తిరిగి చెల్లింపు పరిస్థితి",
    loanAmount: "రుణ మొత్తం",
    interestRate: "వడ్డీ రేటు",
    tenure: "కాలవ్యవధి",
    scheme: "పథకం",
    moratorium: "మొరటోరియం",
    estimatedEmi: "అంచనా EMI",
    repaymentRoadmap: "తిరిగి చెల్లింపు మార్గం",
    repaymentJourney: "మీ అంచనా తిరిగి చెల్లింపు ప్రయాణం",
    initialMoratorium: "ప్రారంభ మొరటోరియం",
    repaymentPeriod: "తిరిగి చెల్లింపు కాలం",
    monthlyEmi: "నెలవారీ EMI",
    annualEmi: "వార్షిక EMI",
    illustrative: "ఉదాహరణాత్మక",
    schemeNote:
      "ఇది ఉదాహరణాత్మక తిరిగి చెల్లింపు అంచనా. నిజమైన రుణ నిబంధనలు, వడ్డీ, సబ్సిడీ మరియు మొరటోరియం రుణదాత మరియు పథకం అర్హతపై ఆధారపడి ఉంటాయి.",
    downloadReport: "పూర్తి నివేదికను డౌన్‌లోడ్ చేయండి",
    downloadCompleteReport: "పూర్తి నివేదికను డౌన్‌లోడ్ చేయండి",
    listen: "వినండి",
    audioLoading: "ఆడియో సృష్టించబడుతోంది...",
    audioNotSupported: "ఈ బ్రౌజర్‌లో వాయిస్ అవుట్‌పుట్ లేదు.",
    audioError: "సృష్టించిన ఆడియోను ప్లే చేయడం సాధ్యం కాలేదు.",
    supportOpportunities: "మద్దతు అవకాశాలు",
    exploreSupport: "సంభావ్య మద్దతు పథకాలను చూడండి",
    governmentBankSupport: "ప్రభుత్వం / బ్యాంక్ మద్దతు",
    supportDesc:
      "మీ స్థానం, వ్యాపార రకం మరియు అర్హత ఆధారంగా మీరు ప్రభుత్వ పథకాలు, సబ్సిడీలు లేదా అధికారిక క్రెడిట్ కార్యక్రమాలను చూడవచ్చు.",
    explore: "చూడండి",
    supportNote:
      "పథకం అర్హత మరియు అందుబాటును అధికారిక ప్రభుత్వ లేదా బ్యాంకింగ్ వనరుల ద్వారా తప్పనిసరిగా తనిఖీ చేయాలి.",
    gramSaarthiRecommendation: "GramSaarthi సిఫార్సు",
    financeAdvice:
      "చిన్న ప్రాక్టికల్ పెట్టుబడితో ప్రారంభించండి, అత్యవసర పని మూలధనాన్ని ఉంచండి మరియు రుణం తీసుకునే ముందు ఆర్థిక ఎంపికలను పోల్చండి.",
    generateRoadmap: "నా వ్యాపార రోడ్‌మ్యాప్ రూపొందించండి",

    yourBusinessRoadmap: "మీ వ్యాపార రోడ్‌మ్యాప్",
    personalizedRoadmap: "వ్యక్తిగత రోడ్‌మ్యాప్",
    pathIdeaAction: "ఆలోచన నుండి చర్య వరకు మీ మార్గం.",
    roadmapDesc:
      "మీరు అందించిన సమాచారం ఆధారంగా ఇది ఒక సులభమైన ప్రారంభ ప్రణాళిక.",
    recommendedBusiness: "సిఫార్సు చేసిన వ్యాపారం",
    startingPoint: "మీ ప్రారంభ స్థానం",
    notSpecified: "పేర్కొనలేదు",
    actionPlan: "30 రోజుల కార్యాచరణ ప్రణాళిక",
    startSmall: "చిన్నగా ప్రారంభించండి. నేర్చుకోండి. తరువాత పెంచండి.",
    validateDemand: "స్థానిక డిమాండ్‌ను ధృవీకరించండి",
    validateDemandDesc:
      "ఎక్కువ ఖర్చు చేసే ముందు సంభావ్య కస్టమర్లతో మాట్లాడి వారికి నిజంగా ఏమి అవసరమో తెలుసుకోండి.",
    smallPilot: "చిన్న పైలట్‌తో ప్రారంభించండి",
    smallPilotDesc:
      "మీ ఉత్పత్తి లేదా సేవను నిర్వహించగల స్థాయిలో పరీక్షించి ఖర్చులు మరియు అమ్మకాలను నమోదు చేయండి.",
    trackNumbers: "మీ సంఖ్యలను ట్రాక్ చేయండి",
    trackNumbersDesc:
      "అంచనాలపై మాత్రమే ఆధారపడకుండా కస్టమర్లు, ఆదాయం, ఖర్చులు మరియు నెలవారీ లాభాన్ని గమనించండి.",
    scaleCarefully: "జాగ్రత్తగా విస్తరించండి",
    scaleCarefullyDesc:
      "లాభాలను తిరిగి పెట్టుబడి పెట్టండి మరియు వ్యాపారంలో స్థిరమైన డిమాండ్ కనిపించిన తర్వాత మాత్రమే అదనపు నిధులను పరిగణించండి.",
    estimatedMonthlyRevenue: "అంచనా నెలవారీ ఆదాయం",
    estimatedMonthlyProfit: "అంచనా నెలవారీ లాభం",
    businessRisk: "వ్యాపార ప్రమాదం",
    finalAdvice: "GramSaarthi చివరి సలహా",
    finalAdviceDesc:
      "అతి పెద్ద పెట్టుబడితో ప్రారంభించవద్దు. ప్రాక్టికల్ పైలట్‌తో ప్రారంభించి, డిమాండ్‌ను ధృవీకరించి, ఖర్చులను నియంత్రించి, సంఖ్యలు అనుకూలంగా ఉన్నప్పుడు పెంచండి.",
    backToGramSaarthi: "GramSaarthiకి తిరిగి వెళ్లండి",

    features: "ఫీచర్లు",
    howItWorks: "ఇది ఎలా పనిచేస్తుంది",
    startAssessment: "అంచనాను ప్రారంభించండి",
    aiPoweredAdvisor: "AI ఆధారిత గ్రామీణ వ్యాపార సలహాదారు",
    smarterBusiness: "మీ ఆలోచనను మరింత స్మార్ట్ వ్యాపారంగా మార్చండి.",
    heroDesc:
      "GramSaarthi AI గ్రామీణ వ్యాపారవేత్తలకు సరైన వ్యాపారాన్ని కనుగొనడం, స్థానిక మార్కెట్‌ను అర్థం చేసుకోవడం, ప్రమాదాలను నిర్వహించడం మరియు రుణం తీసుకునే ముందు ఆర్థిక ప్రణాళిక చేయడంలో సహాయపడుతుంది.",
    startBusinessAssessment: "వ్యాపార అంచనాను ప్రారంభించండి",
    exploreFeatures: "ఫీచర్లను చూడండి",
    simpleToUse: "ఉపయోగించడానికి సులభం",
    localInsights: "స్థానిక సమాచారం",
    smartFinancialPlanning: "స్మార్ట్ ఆర్థిక ప్రణాళిక",
    aiBusinessAdvisor: "AI వ్యాపార సలహాదారు",
    online: "ఆన్‌లైన్",
    namaste: "నమస్తే!",
    askGramSaarthi: "GramSaarthiని అడగండి...",
    whatWeOffer: "మేము అందించేది",
    everythingBeforeInvest: "పెట్టుబడి పెట్టే ముందు మీకు కావలసిన ప్రతిదీ.",
    aiBusinessMatching: "AI వ్యాపార సరిపోలిక",
    aiBusinessMatchingDesc:
      "మీ మూలధనం, నైపుణ్యాలు, వనరులు మరియు స్థానిక అవకాశాలకు సరిపోయే వ్యాపారాలను కనుగొనండి.",
    localMarketAnalysis: "స్థానిక మార్కెట్ విశ్లేషణ",
    localMarketAnalysisDesc:
      "మీ గ్రామం చుట్టూ ఉన్న డిమాండ్, పోటీ మరియు మార్కెట్ అవకాశాలను అర్థం చేసుకోండి.",
    businessSimulatorDesc:
      "డబ్బు పెట్టుబడి పెట్టే ముందు వివిధ ధరలు, కస్టమర్లు మరియు ఖర్చులను పరీక్షించండి.",
    smartFinancialPlanningDesc:
      "ప్రాజెక్ట్ ఖర్చు, సంభావ్య ఆర్థిక సహాయం మరియు తిరిగి చెల్లింపు ప్రణాళికను అర్థం చేసుకోండి.",
    howItWorksTitle: "ఇది ఎలా పనిచేస్తుంది",
    fourSteps: "ఆలోచన నుండి చర్య వరకు 4 సులభమైన దశలు.",
    tellUsAboutYou: "మీ గురించి చెప్పండి",
    tellUsAboutYouDesc:
      "మీ స్థానం, మూలధనం, నైపుణ్యాలు మరియు వనరులను పంచుకోండి.",
    discoverOpportunities: "అవకాశాలను కనుగొనండి",
    discoverOpportunitiesDesc:
      "మా వ్యవస్థ సరైన స్థానిక వ్యాపార అవకాశాలను విశ్లేషిస్తుంది.",
    testYourIdea: "మీ ఆలోచనను పరీక్షించండి",
    testYourIdeaDesc:
      "లాభాలు, ప్రమాదాలు మరియు వివిధ వ్యాపార పరిస్థితులను సిమ్యులేట్ చేయండి.",
    planWithConfidence: "ఆత్మవిశ్వాసంతో ప్రణాళిక చేయండి",
    planWithConfidenceDesc:
      "మీ వ్యక్తిగత వ్యాపార మరియు ఆర్థిక రోడ్‌మ్యాప్‌ను పొందండి.",
    footerText:
      "గ్రామీణ స్థాయిలో స్మార్ట్ వ్యాపారవేత్తలను బలోపేతం చేయడం.",

    dairyBusiness: "డెయిరీ వ్యాపారం",
    groceryStore: "కిరాణా దుకాణం",
    tailoringBusiness: "టైలరింగ్ వ్యాపారం",
    poultryBusiness: "పౌల్ట్రీ వ్యాపారం",
    foodProcessing: "ఆహార ప్రాసెసింగ్",
    smallGroceryStore: "చిన్న కిరాణా దుకాణం",
    dairyReason:
      "స్థానిక డిమాండ్ మరియు వనరులు అందుబాటులో ఉంటే డెయిరీకి మంచి అవకాశం ఉంది.",
    groceryReason:
      "కిరాణా వ్యాపారం స్థానిక కుటుంబాల సాధారణ డిమాండ్ నుండి ప్రయోజనం పొందవచ్చు.",
    tailoringReason:
      "టైలరింగ్ వ్యాపారాన్ని తక్కువ ప్రారంభ పెట్టుబడితో మరియు నైపుణ్య ఆధారిత పనితో ప్రారంభించవచ్చు.",
    poultryReason:
      "పౌల్ట్రీకి మంచి స్థానిక డిమాండ్ ఉండవచ్చు, కానీ ఖర్చు మరియు ఆరోగ్య నిర్వహణ జాగ్రత్తగా చేయాలి.",
    foodProcessingReason:
      "స్థానిక ఆహార ప్రాసెసింగ్ వ్యవసాయ ఉత్పత్తులకు విలువను జోడించి సమీప మార్కెట్లకు సేవ చేయగలదు.",
    smallGroceryReason:
      "చిన్న కిరాణా దుకాణం స్థానిక సమాజం యొక్క రోజువారీ అవసరాలను తీర్చగలదు.",
    microFinance: "మైక్రో ఫైనాన్స్",
    termLoan: "టర్మ్ లోన్",
    aiAnalysisFailed: "AI విశ్లేషణ విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.",
    backendError:
      "GramSaarthi AIకి కనెక్ట్ కాలేకపోయాం. backend నడుస్తుందో లేదో నిర్ధారించండి.",
    aiReportError:
      "AI నివేదికను చూపలేకపోయాం. దయచేసి మళ్లీ విశ్లేషించండి.",
  },

  Kannada: {
    step1: "ಹಂತ 1 / 3",
    assessment: "ವ್ಯವಹಾರ ಮೌಲ್ಯಮಾಪನ",
    tellSituation: "ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿಯ ಬಗ್ಗೆ ತಿಳಿಸಿ.",
    assessmentDesc:
      "ನಿಮ್ಮ ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆಗೆ ಹೊಂದುವ ವ್ಯವಹಾರ ಅವಕಾಶಗಳನ್ನು ಹುಡುಕಲು ನಾವು ಈ ಮಾಹಿತಿಯನ್ನು ಬಳಸುತ್ತೇವೆ.",
    location: "ನೀವು ಎಲ್ಲಿ ವ್ಯವಹಾರ ಪ್ರಾರಂಭಿಸಲು ಬಯಸುತ್ತೀರಿ?",
    locationPlaceholder: "ಗ್ರಾಮ / ಪಟ್ಟಣ ನಮೂದಿಸಿ",
    capital: "ನಿಮ್ಮ ಬಳಿ ಎಷ್ಟು ಸ್ವಂತ ಬಂಡವಾಳವಿದೆ?",
    capitalPlaceholder: "ಉದಾಹರಣೆ: ₹80,000",
    language: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    skills: "ನಿಮ್ಮ ಬಳಿ ಯಾವ ಕೌಶಲ್ಯ ಅಥವಾ ಅನುಭವವಿದೆ?",
    skillsPlaceholder: "ಉದಾಹರಣೆ: ಕೃಷಿ, ಹೊಲಿಗೆ, ಅಡುಗೆ...",
    resources: "ನಿಮ್ಮ ಬಳಿ ಈಗಾಗಲೇ ಯಾವ ಸಂಪನ್ಮೂಲಗಳಿವೆ?",
    resourcesPlaceholder: "ಉದಾಹರಣೆ: ಜಮೀನು, ಅಂಗಡಿ, ಜಾನುವಾರು...",
    businessIdea: "ನಿಮ್ಮ ಬಳಿ ಈಗಾಗಲೇ ವ್ಯವಹಾರದ ಕಲ್ಪನೆ ಇದೆಯೇ?",
    selectBusiness: "ವ್ಯವಹಾರ ಆಯ್ಕೆಮಾಡಿ",
    continue: "ಮುಂದುವರಿಸಿ",

    assessmentComplete: "ಮೌಲ್ಯಮಾಪನ ಪೂರ್ಣಗೊಂಡಿದೆ",
    businessMatch: "ನಿಮ್ಮ ವ್ಯವಹಾರದ ಹೊಂದಾಣಿಕೆ",
    found: "ನಾವು ಇದನ್ನು ಕಂಡುಕೊಂಡಿದ್ದೇವೆ.",
    matchDesc:
      "ನಿಮ್ಮ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ ಈ ವ್ಯವಹಾರಗಳು ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿಗೆ ಸೂಕ್ತವಾಗಿರಬಹುದು.",
    recommended: "#1 ಶಿಫಾರಸು",
    matchScore: "ಹೊಂದಾಣಿಕೆ ಅಂಕ",
    marketReach: "ಮಾರುಕಟ್ಟೆ ತಲುಪುವಿಕೆ",
    primaryCustomers: "ಪ್ರಮುಖ ಗ್ರಾಹಕರು",
    distributionChannels: "ವಿತರಣಾ ಮಾರ್ಗಗಳು",
    opportunity: "ಅವಕಾಶ ವಿಶ್ಲೇಷಣೆ",
    swot: "SWOT ವಿಶ್ಲೇಷಣೆ",
    localDemand: "ಸ್ಥಳೀಯ ಬೇಡಿಕೆ",
    capitalFit: "ಬಂಡವಾಳ ಹೊಂದಾಣಿಕೆ",
    resourceFit: "ಸಂಪನ್ಮೂಲ ಹೊಂದಾಣಿಕೆ",
    risk: "ಅಪಾಯ",
    exploreBusiness: "ವ್ಯವಹಾರ ನೋಡಿ",
    strengths: "ಸಾಮರ್ಥ್ಯಗಳು",
    weaknesses: "ದೌರ್ಬಲ್ಯಗಳು",
    opportunities: "ಅವಕಾಶಗಳು",
    threats: "ಬೆದರಿಕೆಗಳು",
    localThreats: "ಸ್ಥಳೀಯ ಬೆದರಿಕೆಗಳು",
    competitors: "ಸ್ಪರ್ಧಿ ವಿಶ್ಲೇಷಣೆ",
    mainCompetitors: "ಪ್ರಮುಖ ಸ್ಪರ್ಧಿಗಳು",
    competitiveAdvantage: "ನಿಮ್ಮ ಸ್ಪರ್ಧಾತ್ಮಕ ಪ್ರಯೋಜನ",
    pricing: "ಬೆಲೆ ತಂತ್ರ",
    strategy: "ತಂತ್ರ:",
    suggestedPricing: "ಸೂಚಿಸಿದ ಬೆಲೆ:",
    why: "ಏಕೆ:",
    recommendation: "GramSaarthi ಶಿಫಾರಸು",
    recommendedSteps: "ಶಿಫಾರಸು ಮಾಡಿದ ಹಂತಗಳು",

    marketAnalysis: "ಮಾರುಕಟ್ಟೆ ವಿಶ್ಲೇಷಣೆ",
    hyperLocalMarket: "ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ವಿಶ್ಲೇಷಣೆ",
    understandMarket: "ನಿಮ್ಮ ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    marketDesc:
      "ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಸ್ಥಳದ ಸುತ್ತಲಿನ ಅವಕಾಶಗಳ ಡೆಮೋ ವಿಶ್ಲೇಷಣೆ ಇದು.",
    yourVillage: "ನಿಮ್ಮ ಗ್ರಾಮ",
    localMarketArea: "ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ಪ್ರದೇಶ",
    estimatedDemand: "ಅಂದಾಜು ಬೇಡಿಕೆ",
    high: "ಹೆಚ್ಚು",
    competition: "ಸ್ಪರ್ಧೆ",
    medium: "ಮಧ್ಯಮ",
    growthPotential: "ಬೆಳವಣಿಗೆಯ ಸಾಧ್ಯತೆ",
    strong: "ಬಲವಾದ",
    seasonalDemand: "ಋತುಮಾನಿಕ ಬೇಡಿಕೆ",
    whenDemandHighest: "ಬೇಡಿಕೆ ಯಾವಾಗ ಹೆಚ್ಚು?",
    demoData: "ಡೆಮೋ ಡೇಟಾ",
    summer: "ಬೇಸಿಗೆ",
    monsoon: "ಮಳೆಗಾಲ",
    winter: "ಚಳಿಗಾಲ",
    festival: "ಹಬ್ಬ",
    competitorMap: "ಸ್ಪರ್ಧಿ ನಕ್ಷೆ",
    nearbyBusinessActivity: "ಹತ್ತಿರದ ವ್ಯವಹಾರ ಚಟುವಟಿಕೆ",
    illustrative: "ಉದಾಹರಣಾತ್ಮಕ",
    localMarketRadius: "5–10 ಕಿಮೀ ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ",
    yourLocation: "ನಿಮ್ಮ ಸ್ಥಳ",
    mapNote:
      "ಈ ಪ್ರೋಟೋಟೈಪ್ ಉದಾಹರಣಾತ್ಮಕ ಡೇಟಾವನ್ನು ಬಳಸುತ್ತದೆ. ನಿಜವಾದ ಸ್ಪರ್ಧಿ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಡೇಟಾವನ್ನು ನಂತರ API ಮೂಲಕ ಸಂಪರ್ಕಿಸಬಹುದು.",
    analyzeRisks: "ವ್ಯವಹಾರ ಅಪಾಯಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ",

    riskAnalysis: "ಅಪಾಯ ವಿಶ್ಲೇಷಣೆ",
    aiRiskAnalysis: "AI ಅಪಾಯ ವಿಶ್ಲೇಷಣೆ",
    knowRisks: "ಹೂಡಿಕೆ ಮಾಡುವ ಮೊದಲು ಅಪಾಯಗಳನ್ನು ತಿಳಿಯಿರಿ.",
    riskDesc:
      "ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ವ್ಯವಹಾರಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಪ್ರಮುಖ ಅಪಾಯಗಳು ಮತ್ತು ಅವುಗಳನ್ನು ನಿರ್ವಹಿಸುವ ವಿಧಾನಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    overallRisk: "ಒಟ್ಟಾರೆ ವ್ಯವಹಾರ ಅಪಾಯ",
    manageablePlanning:
      "ಎಚ್ಚರಿಕೆಯ ಯೋಜನೆಯೊಂದಿಗೆ ಈ ಅಪಾಯದ ಮಟ್ಟವನ್ನು ನಿರ್ವಹಿಸಬಹುದು.",
    marketRisk: "ಮಾರುಕಟ್ಟೆ ಅಪಾಯ",
    changingDemand: "ಬದಲಾಗುತ್ತಿರುವ ಸ್ಥಳೀಯ ಬೇಡಿಕೆ",
    marketRiskDesc:
      "ಋತುಗಳು, ಬೆಲೆಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಸ್ಪರ್ಧೆಯಿಂದ ಗ್ರಾಹಕರ ಬೇಡಿಕೆ ಬದಲಾಗಬಹುದು.",
    financialRisk: "ಆರ್ಥಿಕ ಅಪಾಯ",
    initialInvestment: "ಆರಂಭಿಕ ಹೂಡಿಕೆ",
    financialRiskDesc:
      "ವ್ಯವಹಾರವನ್ನು ಪ್ರಾರಂಭಿಸುವಾಗ ಮತ್ತು ಬೆಳೆಸುವಾಗ ಸಾಕಷ್ಟು ಕಾರ್ಯನಿರ್ವಹಣಾ ಬಂಡವಾಳವನ್ನು ಇರಿಸಿ.",
    seasonalRisk: "ಋತುಮಾನಿಕ ಅಪಾಯ",
    seasonDependentSales: "ಋತುವಿನ ಮೇಲೆ ಅವಲಂಬಿತ ಮಾರಾಟ",
    seasonalRiskDesc:
      "ಕೆಲವು ವ್ಯವಹಾರಗಳಲ್ಲಿ ವಿವಿಧ ಋತುಗಳಲ್ಲಿ ಬೇಡಿಕೆ ಬದಲಾಗಬಹುದು.",
    low: "ಕಡಿಮೆ",
    aiSwot: "AI SWOT ವಿಶ್ಲೇಷಣೆ",
    businessAtGlance: "ನಿಮ್ಮ ವ್ಯವಹಾರದ ಒಂದು ನೋಟ",
    strongLocalDemand: "ಬಲವಾದ ಸ್ಥಳೀಯ ಬೇಡಿಕೆ",
    repeatCustomers: "ಮರುಬರುವ ಗ್ರಾಹಕರ ಸಾಧ್ಯತೆ",
    manageableScale: "ಸಣ್ಣ ಪ್ರಮಾಣದಲ್ಲಿ ಪ್ರಾರಂಭಿಸಬಹುದು",
    limitedResources: "ಸೀಮಿತ ಸಂಪನ್ಮೂಲಗಳು",
    consistentQuality: "ಸ್ಥಿರ ಗುಣಮಟ್ಟವನ್ನು ಕಾಪಾಡಬೇಕು",
    limitedMarketReach: "ಆರಂಭಿಕ ಮಾರುಕಟ್ಟೆ ತಲುಪುವಿಕೆ ಸೀಮಿತ",
    growingLocalDemand: "ಹೆಚ್ಚುತ್ತಿರುವ ಸ್ಥಳೀಯ ಬೇಡಿಕೆ",
    digitalMarketing: "ಡಿಜಿಟಲ್ ಮಾರ್ಕೆಟಿಂಗ್ ಅವಕಾಶಗಳು",
    governmentSupport: "ಸರ್ಕಾರಿ ಸಹಾಯದ ಅವಕಾಶಗಳು",
    newCompetitors: "ಹೊಸ ಸ್ಪರ್ಧಿಗಳು",
    priceFluctuations: "ಬೆಲೆ ಏರಿಳಿತ",
    seasonalChanges: "ಋತುಮಾನಿಕ ಬದಲಾವಣೆಗಳು",
    trySimulator: "ವ್ಯವಹಾರ ಸಿಮ್ಯುಲೇಟರ್ ಪ್ರಯತ್ನಿಸಿ",

    businessSimulator: "ವ್ಯವಹಾರ ಸಿಮ್ಯುಲೇಟರ್",
    whatIfSimulator: "ವ್ಯವಹಾರ ಸಿಮ್ಯುಲೇಟರ್",
    testIdea: "ಹೂಡಿಕೆ ಮಾಡುವ ಮೊದಲು ನಿಮ್ಮ ಕಲ್ಪನೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ.",
    simulatorDesc:
      "ಕೆಳಗಿನ ಸಂಖ್ಯೆಯನ್ನು ಬದಲಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಅಂದಾಜು ವ್ಯವಹಾರ ಕಾರ್ಯಕ್ಷಮತೆ ಹೇಗೆ ಬದಲಾಗುತ್ತದೆ ನೋಡಿ.",
    initialInvestment: "ಆರಂಭಿಕ ಹೂಡಿಕೆ",
    customersPerDay: "ದಿನಕ್ಕೆ ಗ್ರಾಹಕರು",
    averagePrice: "ಪ್ರತಿ ಗ್ರಾಹಕರ ಸರಾಸರಿ ಬೆಲೆ",
    monthlyExpenses: "ಮಾಸಿಕ ವೆಚ್ಚಗಳು",
    monthlyRevenue: "ಮಾಸಿಕ ಆದಾಯ",
    monthlyProfit: "ಮಾಸಿಕ ಲಾಭ",
    yearlyProfit: "ವಾರ್ಷಿಕ ಲಾಭ",
    gramSaarthiInsight: "GramSaarthi ಮಾಹಿತಿ",
    simulatorNote:
      "ಇದು ನಿಮ್ಮ ಊಹೆಗಳ ಆಧಾರದ ಮೇಲೆ ಮಾಡಿದ ಪ್ರೋಟೋಟೈಪ್ ಅಂದಾಜು. ನಿಜವಾದ ಫಲಿತಾಂಶಗಳು ಸ್ಥಳೀಯ ಬೇಡಿಕೆ, ಬೆಲೆ, ಕಾರ್ಯಾಚರಣಾ ವೆಚ್ಚಗಳು ಮತ್ತು ಇತರ ವ್ಯವಹಾರ ಪರಿಸ್ಥಿತಿಗಳ ಮೇಲೆ ಬದಲಾಗಬಹುದು.",
    planFinances: "ನಿಮ್ಮ ಹಣಕಾಸು ಯೋಜನೆಯನ್ನು ರೂಪಿಸಿ",

    financialPlanner: "ಹಣಕಾಸು ಯೋಜಕ",
    smartFinancialPlanning: "ಸ್ಮಾರ್ಟ್ ಹಣಕಾಸು ಯೋಜನೆ",
    planFunding: "ಸಾಲ ಪಡೆಯುವ ಮೊದಲು ನಿಮ್ಮ ಹಣಕಾಸನ್ನು ಯೋಜಿಸಿ.",
    financeDesc:
      "ನಿಮ್ಮ ಅಂದಾಜು ಹೂಡಿಕೆ, ಸ್ವಂತ ಕೊಡುಗೆ ಮತ್ತು ಸಾಧ್ಯವಾದ ಹಣಕಾಸಿನ ಅಗತ್ಯವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    estimatedProjectCost: "ಅಂದಾಜು ಯೋಜನಾ ವೆಚ್ಚ",
    yourContribution: "ನಿಮ್ಮ ಕೊಡುಗೆ",
    estimatedFundingGap: "ಅಂದಾಜು ಹಣಕಾಸು ಕೊರತೆ",
    loanPreview: "ಸಾಲದ ಅವಲೋಕನ",
    possibleRepayment: "ಸಂಭಾವ್ಯ ಮರುಪಾವತಿ ಪರಿಸ್ಥಿತಿ",
    loanAmount: "ಸಾಲದ ಮೊತ್ತ",
    interestRate: "ಬಡ್ಡಿ ದರ",
    tenure: "ಅವಧಿ",
    scheme: "ಯೋಜನೆ",
    moratorium: "ಮೋರಟೋರಿಯಂ",
    estimatedEmi: "ಅಂದಾಜು EMI",
    repaymentRoadmap: "ಮರುಪಾವತಿ ಮಾರ್ಗ",
    repaymentJourney: "ನಿಮ್ಮ ಅಂದಾಜು ಮರುಪಾವತಿ ಪ್ರಯಾಣ",
    initialMoratorium: "ಆರಂಭಿಕ ಮೋರಟೋರಿಯಂ",
    repaymentPeriod: "ಮರುಪಾವತಿ ಅವಧಿ",
    monthlyEmi: "ಮಾಸಿಕ EMI",
    annualEmi: "ವಾರ್ಷಿಕ EMI",
    illustrative: "ಉದಾಹರಣಾತ್ಮಕ",
    schemeNote:
      "ಇದು ಉದಾಹರಣಾತ್ಮಕ ಮರುಪಾವತಿ ಅಂದಾಜು. ನಿಜವಾದ ಸಾಲದ ನಿಯಮಗಳು, ಬಡ್ಡಿ, ಸಬ್ಸಿಡಿ ಮತ್ತು ಮೋರಟೋರಿಯಂ ಸಾಲದಾತ ಮತ್ತು ಯೋಜನೆಯ ಅರ್ಹತೆಯನ್ನು ಅವಲಂಬಿಸಿರುತ್ತದೆ.",
    downloadReport: "ಸಂಪೂರ್ಣ ವರದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    downloadCompleteReport: "ಸಂಪೂರ್ಣ ವರದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    listen: "ಕೇಳಿ",
    audioLoading: "ಆಡಿಯೋ ತಯಾರಿಸಲಾಗುತ್ತಿದೆ...",
    audioNotSupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ವಾಯ್ಸ್ ಔಟ್‌ಪುಟ್ ಅನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ.",
    audioError: "ರಚಿಸಲಾದ ಆಡಿಯೋವನ್ನು ಪ್ಲೇ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    supportOpportunities: "ಬೆಂಬಲದ ಅವಕಾಶಗಳು",
    exploreSupport: "ಸಂಭಾವ್ಯ ಬೆಂಬಲ ಯೋಜನೆಗಳನ್ನು ನೋಡಿ",
    governmentBankSupport: "ಸರ್ಕಾರ / ಬ್ಯಾಂಕ್ ಬೆಂಬಲ",
    supportDesc:
      "ನಿಮ್ಮ ಸ್ಥಳ, ವ್ಯವಹಾರದ ಪ್ರಕಾರ ಮತ್ತು ಅರ್ಹತೆಯ ಆಧಾರದ ಮೇಲೆ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ಸಬ್ಸಿಡಿಗಳು ಅಥವಾ ಅಧಿಕೃತ ಸಾಲ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಪರಿಶೀಲಿಸಬಹುದು.",
    explore: "ನೋಡಿ",
    supportNote:
      "ಯೋಜನೆಯ ಅರ್ಹತೆ ಮತ್ತು ಲಭ್ಯತೆಯನ್ನು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಅಥವಾ ಬ್ಯಾಂಕಿಂಗ್ ಮೂಲಗಳಿಂದ ಪರಿಶೀಲಿಸಬೇಕು.",
    gramSaarthiRecommendation: "GramSaarthi ಶಿಫಾರಸು",
    financeAdvice:
      "ಸಣ್ಣ ಪ್ರಾಯೋಗಿಕ ಹೂಡಿಕೆಯಿಂದ ಪ್ರಾರಂಭಿಸಿ, ತುರ್ತು ಕಾರ್ಯನಿರ್ವಹಣಾ ಬಂಡವಾಳವನ್ನು ಇಟ್ಟುಕೊಳ್ಳಿ ಮತ್ತು ಸಾಲ ಪಡೆಯುವ ಮೊದಲು ಹಣಕಾಸಿನ ಆಯ್ಕೆಗಳನ್ನು ಹೋಲಿಸಿ.",
    generateRoadmap: "ನನ್ನ ವ್ಯವಹಾರ ಮಾರ್ಗವನ್ನು ರಚಿಸಿ",

    yourBusinessRoadmap: "ನಿಮ್ಮ ವ್ಯವಹಾರ ಮಾರ್ಗ",
    personalizedRoadmap: "ವೈಯಕ್ತಿಕ ಮಾರ್ಗ",
    pathIdeaAction: "ಕಲ್ಪನೆಯಿಂದ ಕಾರ್ಯದವರೆಗೆ ನಿಮ್ಮ ಮಾರ್ಗ.",
    roadmapDesc:
      "ನೀವು ನೀಡಿದ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ ಇದು ಸರಳ ಆರಂಭಿಕ ಯೋಜನೆ.",
    recommendedBusiness: "ಶಿಫಾರಸು ಮಾಡಿದ ವ್ಯವಹಾರ",
    startingPoint: "ನಿಮ್ಮ ಆರಂಭಿಕ ಸ್ಥಿತಿ",
    notSpecified: "ನಮೂದಿಸಿಲ್ಲ",
    actionPlan: "30 ದಿನಗಳ ಕಾರ್ಯ ಯೋಜನೆ",
    startSmall: "ಸಣ್ಣದಾಗಿ ಪ್ರಾರಂಭಿಸಿ. ಕಲಿಯಿರಿ. ನಂತರ ಬೆಳೆಸಿ.",
    validateDemand: "ಸ್ಥಳೀಯ ಬೇಡಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
    validateDemandDesc:
      "ಹೆಚ್ಚು ಖರ್ಚು ಮಾಡುವ ಮೊದಲು ಸಾಧ್ಯವಾದ ಗ್ರಾಹಕರೊಂದಿಗೆ ಮಾತನಾಡಿ ಮತ್ತು ಅವರಿಗೆ ನಿಜವಾಗಿ ಏನು ಬೇಕು ಎಂದು ತಿಳಿಯಿರಿ.",
    smallPilot: "ಸಣ್ಣ ಪೈಲಟ್‌ನಿಂದ ಪ್ರಾರಂಭಿಸಿ",
    smallPilotDesc:
      "ನಿಮ್ಮ ಉತ್ಪನ್ನ ಅಥವಾ ಸೇವೆಯನ್ನು ಸಣ್ಣ ಪ್ರಮಾಣದಲ್ಲಿ ಪರೀಕ್ಷಿಸಿ ಮತ್ತು ವೆಚ್ಚ ಹಾಗೂ ಮಾರಾಟವನ್ನು ದಾಖಲಿಸಿ.",
    trackNumbers: "ನಿಮ್ಮ ಸಂಖ್ಯೆಯನ್ನು ಗಮನಿಸಿ",
    trackNumbersDesc:
      "ಊಹೆಗಳ ಮೇಲೆ ಮಾತ್ರ ಅವಲಂಬಿಸದೆ ಗ್ರಾಹಕರು, ಆದಾಯ, ವೆಚ್ಚ ಮತ್ತು ಮಾಸಿಕ ಲಾಭವನ್ನು ಗಮನಿಸಿ.",
    scaleCarefully: "ಎಚ್ಚರಿಕೆಯಿಂದ ವಿಸ್ತರಿಸಿ",
    scaleCarefullyDesc:
      "ಲಾಭವನ್ನು ಮರುಹೂಡಿಕೆ ಮಾಡಿ ಮತ್ತು ವ್ಯವಹಾರದಲ್ಲಿ ನಿರಂತರ ಬೇಡಿಕೆ ಕಂಡುಬಂದ ನಂತರ ಮಾತ್ರ ಹೆಚ್ಚುವರಿ ಹಣಕಾಸನ್ನು ಪರಿಗಣಿಸಿ.",
    estimatedMonthlyRevenue: "ಅಂದಾಜು ಮಾಸಿಕ ಆದಾಯ",
    estimatedMonthlyProfit: "ಅಂದಾಜು ಮಾಸಿಕ ಲಾಭ",
    businessRisk: "ವ್ಯವಹಾರ ಅಪಾಯ",
    finalAdvice: "GramSaarthi ಅಂತಿಮ ಸಲಹೆ",
    finalAdviceDesc:
      "ಅತಿದೊಡ್ಡ ಹೂಡಿಕೆಯಿಂದ ಪ್ರಾರಂಭಿಸಬೇಡಿ. ಪ್ರಾಯೋಗಿಕ ಪೈಲಟ್‌ನಿಂದ ಪ್ರಾರಂಭಿಸಿ, ಬೇಡಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸಿ, ವೆಚ್ಚ ನಿಯಂತ್ರಿಸಿ ಮತ್ತು ಸಂಖ್ಯೆಗಳು ಅನುಕೂಲವಾದಾಗ ಬೆಳೆಸಿ.",
    backToGramSaarthi: "GramSaarthi ಗೆ ಹಿಂತಿರುಗಿ",

    features: "ವೈಶಿಷ್ಟ್ಯಗಳು",
    howItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    startAssessment: "ಮೌಲ್ಯಮಾಪನ ಪ್ರಾರಂಭಿಸಿ",
    aiPoweredAdvisor: "AI ಆಧಾರಿತ ಗ್ರಾಮೀಣ ವ್ಯವಹಾರ ಸಲಹೆಗಾರ",
    smarterBusiness: "ನಿಮ್ಮ ಕಲ್ಪನೆಯನ್ನು ಸ್ಮಾರ್ಟ್ ವ್ಯವಹಾರವಾಗಿ ಪರಿವರ್ತಿಸಿ.",
    heroDesc:
      "GramSaarthi AI ಗ್ರಾಮೀಣ ಉದ್ಯಮಿಗಳಿಗೆ ಸರಿಯಾದ ವ್ಯವಹಾರ ಕಂಡುಹಿಡಿಯಲು, ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು, ಅಪಾಯಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಮತ್ತು ಸಾಲ ಪಡೆಯುವ ಮೊದಲು ಹಣಕಾಸು ಯೋಜನೆ ಮಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    startBusinessAssessment: "ವ್ಯವಹಾರ ಮೌಲ್ಯಮಾಪನ ಪ್ರಾರಂಭಿಸಿ",
    exploreFeatures: "ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ನೋಡಿ",
    simpleToUse: "ಬಳಸಲು ಸುಲಭ",
    localInsights: "ಸ್ಥಳೀಯ ಮಾಹಿತಿ",
    smartFinancialPlanning: "ಸ್ಮಾರ್ಟ್ ಹಣಕಾಸು ಯೋಜನೆ",
    aiBusinessAdvisor: "AI ವ್ಯವಹಾರ ಸಲಹೆಗಾರ",
    online: "ಆನ್‌ಲೈನ್",
    namaste: "ನಮಸ್ಕಾರ!",
    askGramSaarthi: "GramSaarthi ಅನ್ನು ಕೇಳಿ...",
    whatWeOffer: "ನಾವು ಏನು ನೀಡುತ್ತೇವೆ",
    everythingBeforeInvest: "ಹೂಡಿಕೆ ಮಾಡುವ ಮೊದಲು ನಿಮಗೆ ಬೇಕಾದ ಎಲ್ಲವೂ.",
    aiBusinessMatching: "AI ವ್ಯವಹಾರ ಹೊಂದಾಣಿಕೆ",
    aiBusinessMatchingDesc:
      "ನಿಮ್ಮ ಬಂಡವಾಳ, ಕೌಶಲ್ಯಗಳು, ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಅವಕಾಶಗಳಿಗೆ ಹೊಂದುವ ವ್ಯವಹಾರಗಳನ್ನು ಹುಡುಕಿ.",
    localMarketAnalysis: "ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ವಿಶ್ಲೇಷಣೆ",
    localMarketAnalysisDesc:
      "ನಿಮ್ಮ ಗ್ರಾಮದ ಸುತ್ತಲಿನ ಬೇಡಿಕೆ, ಸ್ಪರ್ಧೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಅವಕಾಶಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    businessSimulatorDesc:
      "ಹಣ ಹೂಡುವ ಮೊದಲು ವಿವಿಧ ಬೆಲೆಗಳು, ಗ್ರಾಹಕರು ಮತ್ತು ವೆಚ್ಚಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ.",
    smartFinancialPlanningDesc:
      "ನಿಮ್ಮ ಯೋಜನಾ ವೆಚ್ಚ, ಸಾಧ್ಯವಾದ ಹಣಕಾಸು ಮತ್ತು ಮರುಪಾವತಿ ಯೋಜನೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    howItWorksTitle: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    fourSteps: "ಕಲ್ಪನೆಯಿಂದ ಕಾರ್ಯದವರೆಗೆ 4 ಸರಳ ಹಂತಗಳು.",
    tellUsAboutYou: "ನಿಮ್ಮ ಬಗ್ಗೆ ತಿಳಿಸಿ",
    tellUsAboutYouDesc:
      "ನಿಮ್ಮ ಸ್ಥಳ, ಬಂಡವಾಳ, ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.",
    discoverOpportunities: "ಅವಕಾಶಗಳನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ",
    discoverOpportunitiesDesc:
      "ನಮ್ಮ ವ್ಯವಸ್ಥೆ ಸೂಕ್ತ ಸ್ಥಳೀಯ ವ್ಯವಹಾರ ಅವಕಾಶಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ.",
    testYourIdea: "ನಿಮ್ಮ ಕಲ್ಪನೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ",
    testYourIdeaDesc:
      "ಲಾಭ, ಅಪಾಯಗಳು ಮತ್ತು ವಿವಿಧ ವ್ಯವಹಾರ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಸಿಮ್ಯುಲೇಟ್ ಮಾಡಿ.",
    planWithConfidence: "ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಯೋಜಿಸಿ",
    planWithConfidenceDesc:
      "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ವ್ಯವಹಾರ ಮತ್ತು ಹಣಕಾಸಿನ ಮಾರ್ಗವನ್ನು ಪಡೆಯಿರಿ.",
    footerText:
      "ಗ್ರಾಮೀಣ ಮಟ್ಟದಲ್ಲಿ ಸ್ಮಾರ್ಟ್ ಉದ್ಯಮಶೀಲತೆಯನ್ನು ಬಲಪಡಿಸುವುದು.",

    dairyBusiness: "ಡೈರಿ ವ್ಯವಹಾರ",
    groceryStore: "ಕಿರಾಣಿ ಅಂಗಡಿ",
    tailoringBusiness: "ಟೈಲರಿಂಗ್ ವ್ಯವಹಾರ",
    poultryBusiness: "ಕೋಳಿ ಸಾಕಾಣಿಕೆ ವ್ಯವಹಾರ",
    foodProcessing: "ಆಹಾರ ಸಂಸ್ಕರಣೆ",
    smallGroceryStore: "ಸಣ್ಣ ಕಿರಾಣಿ ಅಂಗಡಿ",
    dairyReason:
      "ಸ್ಥಳೀಯ ಬೇಡಿಕೆ ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳು ಲಭ್ಯವಿದ್ದರೆ ಡೈರಿಯಲ್ಲಿ ಉತ್ತಮ ಅವಕಾಶವಿದೆ.",
    groceryReason:
      "ಕಿರಾಣಿ ವ್ಯವಹಾರವು ಸ್ಥಳೀಯ ಕುಟುಂಬಗಳ ನಿಯಮಿತ ಬೇಡಿಕೆಯಿಂದ ಪ್ರಯೋಜನ ಪಡೆಯಬಹುದು.",
    tailoringReason:
      "ಟೈಲರಿಂಗ್ ವ್ಯವಹಾರವನ್ನು ಕಡಿಮೆ ಆರಂಭಿಕ ಹೂಡಿಕೆ ಮತ್ತು ಕೌಶಲ್ಯ ಆಧಾರಿತ ಕೆಲಸದಿಂದ ಪ್ರಾರಂಭಿಸಬಹುದು.",
    poultryReason:
      "ಕೋಳಿ ಸಾಕಾಣಿಕೆಗೆ ಉತ್ತಮ ಸ್ಥಳೀಯ ಬೇಡಿಕೆ ಇರಬಹುದು, ಆದರೆ ವೆಚ್ಚ ಮತ್ತು ಆರೋಗ್ಯವನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ನಿರ್ವಹಿಸಬೇಕು.",
    foodProcessingReason:
      "ಸ್ಥಳೀಯ ಆಹಾರ ಸಂಸ್ಕರಣೆ ಕೃಷಿ ಉತ್ಪನ್ನಗಳಿಗೆ ಮೌಲ್ಯ ಸೇರಿಸಿ ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳಿಗೆ ಸೇವೆ ನೀಡಬಹುದು.",
    smallGroceryReason:
      "ಸಣ್ಣ ಕಿರಾಣಿ ಅಂಗಡಿ ಸ್ಥಳೀಯ ಸಮುದಾಯದ ದೈನಂದಿನ ಅಗತ್ಯಗಳನ್ನು ಪೂರೈಸಬಹುದು.",
    microFinance: "ಮೈಕ್ರೋ ಫೈನಾನ್ಸ್",
    termLoan: "ಟರ್ಮ್ ಲೋನ್",
    aiAnalysisFailed: "AI ವಿಶ್ಲೇಷಣೆ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    backendError:
      "GramSaarthi AI ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. backend ಚಾಲನೆಯಲ್ಲಿದೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿ.",
    aiReportError:
      "AI ವರದಿಯನ್ನು ಪ್ರದರ್ಶಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ವಿಶ್ಲೇಷಿಸಿ.",
  },

  Malayalam: {
    step1: "ഘട്ടം 1 / 3",
    assessment: "ബിസിനസ് വിലയിരുത്തൽ",
    tellSituation: "നിങ്ങളുടെ സാഹചര്യത്തെക്കുറിച്ച് പറയൂ.",
    assessmentDesc:
      "നിങ്ങളുടെ വിഭവങ്ങൾക്കും പ്രാദേശിക വിപണിക്കും അനുയോജ്യമായ ബിസിനസ് അവസരങ്ങൾ കണ്ടെത്താൻ ഈ വിവരങ്ങൾ ഉപയോഗിക്കും.",
    location: "നിങ്ങൾ എവിടെയാണ് ബിസിനസ് ആരംഭിക്കാൻ ആഗ്രഹിക്കുന്നത്?",
    locationPlaceholder: "ഗ്രാമം / നഗരം നൽകുക",
    capital: "നിങ്ങളുടെ സ്വന്തം മൂലധനം എത്രയാണ്?",
    capitalPlaceholder: "ഉദാഹരണം: ₹80,000",
    language: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക",
    skills: "നിങ്ങൾക്ക് എന്ത് കഴിവുകളോ പരിചയമോ ഉണ്ട്?",
    skillsPlaceholder: "ഉദാഹരണം: കൃഷി, തയ്യൽ, പാചകം...",
    resources: "നിങ്ങളുടെ കൈവശം ഇതിനകം എന്തെല്ലാം വിഭവങ്ങളുണ്ട്?",
    resourcesPlaceholder: "ഉദാഹരണം: ഭൂമി, കട, കന്നുകാലികൾ...",
    businessIdea: "നിങ്ങൾക്ക് ഇതിനകം ഒരു ബിസിനസ് ആശയമുണ്ടോ?",
    selectBusiness: "ബിസിനസ് തിരഞ്ഞെടുക്കുക",
    continue: "തുടരുക",

    assessmentComplete: "വിലയിരുത്തൽ പൂർത്തിയായി",
    businessMatch: "നിങ്ങളുടെ ബിസിനസ് പൊരുത്തം",
    found: "ഞങ്ങൾ ഇത് കണ്ടെത്തി.",
    matchDesc:
      "നിങ്ങളുടെ വിവരങ്ങളുടെ അടിസ്ഥാനത്തിൽ ഈ ബിസിനസുകൾ നിങ്ങളുടെ സാഹചര്യത്തിന് അനുയോജ്യമായേക്കാം.",
    recommended: "#1 ശുപാർശ",
    matchScore: "പൊരുത്ത സ്കോർ",
    marketReach: "വിപണി എത്തിച്ചേരൽ",
    primaryCustomers: "പ്രധാന ഉപഭോക്താക്കൾ",
    distributionChannels: "വിതരണ മാർഗങ്ങൾ",
    opportunity: "അവസര വിശകലനം",
    swot: "SWOT വിശകലനം",
    localDemand: "പ്രാദേശിക ആവശ്യം",
    capitalFit: "മൂലധന അനുയോജ്യത",
    resourceFit: "വിഭവ അനുയോജ്യത",
    risk: "അപകടസാധ്യത",
    exploreBusiness: "ബിസിനസ് കാണുക",
    strengths: "ശക്തികൾ",
    weaknesses: "ദൗർബല്യങ്ങൾ",
    opportunities: "അവസരങ്ങൾ",
    threats: "ഭീഷണികൾ",
    localThreats: "പ്രാദേശിക ഭീഷണികൾ",
    competitors: "മത്സരാർത്ഥി വിശകലനം",
    mainCompetitors: "പ്രധാന മത്സരാർത്ഥികൾ",
    competitiveAdvantage: "നിങ്ങളുടെ മത്സര നേട്ടം",
    pricing: "വിലനിർണ്ണയ തന്ത്രം",
    strategy: "തന്ത്രം:",
    suggestedPricing: "നിർദ്ദേശിച്ച വില:",
    why: "എന്തുകൊണ്ട്:",
    recommendation: "GramSaarthi ശുപാർശ",
    recommendedSteps: "ശുപാർശ ചെയ്യുന്ന ഘട്ടങ്ങൾ",

    marketAnalysis: "വിപണി വിശകലനം",
    hyperLocalMarket: "പ്രാദേശിക വിപണി വിശകലനം",
    understandMarket: "നിങ്ങളുടെ പ്രാദേശിക വിപണി മനസ്സിലാക്കുക.",
    marketDesc:
      "നിങ്ങൾ തിരഞ്ഞെടുത്ത സ്ഥലത്തിന് ചുറ്റുമുള്ള അവസരങ്ങളുടെ ഡെമോ വിശകലനമാണിത്.",
    yourVillage: "നിങ്ങളുടെ ഗ്രാമം",
    localMarketArea: "പ്രാദേശിക വിപണി പ്രദേശം",
    estimatedDemand: "കണക്കാക്കിയ ആവശ്യം",
    high: "ഉയർന്നത്",
    competition: "മത്സരം",
    medium: "ഇടത്തരം",
    growthPotential: "വളർച്ചാ സാധ്യത",
    strong: "ശക്തമായ",
    seasonalDemand: "കാലാനുസൃത ആവശ്യം",
    whenDemandHighest: "ആവശ്യം ഏറ്റവും കൂടുതലാകുന്നത് എപ്പോൾ?",
    demoData: "ഡെമോ ഡാറ്റ",
    summer: "വേനൽ",
    monsoon: "മഴക്കാലം",
    winter: "ശീതകാലം",
    festival: "ഉത്സവം",
    competitorMap: "മത്സരാർത്ഥി മാപ്പ്",
    nearbyBusinessActivity: "സമീപത്തെ ബിസിനസ് പ്രവർത്തനം",
    illustrative: "ഉദാഹരണാത്മകം",
    localMarketRadius: "5–10 കി.മീ പ്രാദേശിക വിപണി",
    yourLocation: "നിങ്ങളുടെ സ്ഥലം",
    mapNote:
      "ഈ പ്രോട്ടോടൈപ്പ് ഉദാഹരണാത്മക ഡാറ്റ ഉപയോഗിക്കുന്നു. യഥാർത്ഥ മത്സരാർത്ഥികളുടെയും വിപണിയുടെയും ഡാറ്റ പിന്നീട് API വഴി ബന്ധിപ്പിക്കാം.",
    analyzeRisks: "ബിസിനസ് അപകടസാധ്യതകൾ വിശകലനം ചെയ്യുക",

    riskAnalysis: "അപകടസാധ്യതാ വിശകലനം",
    aiRiskAnalysis: "AI അപകടസാധ്യതാ വിശകലനം",
    knowRisks: "നിക്ഷേപിക്കുന്നതിന് മുമ്പ് അപകടസാധ്യതകൾ അറിയുക.",
    riskDesc:
      "നിങ്ങൾ തിരഞ്ഞെടുത്ത ബിസിനസുമായി ബന്ധപ്പെട്ട പ്രധാന അപകടസാധ്യതകളും അവ നിയന്ത്രിക്കുന്ന രീതികളും മനസ്സിലാക്കുക.",
    overallRisk: "മൊത്തത്തിലുള്ള ബിസിനസ് അപകടസാധ്യത",
    manageablePlanning:
      "ശ്രദ്ധാപൂർവമായ ആസൂത്രണത്തിലൂടെ ഈ അപകടസാധ്യത നിയന്ത്രിക്കാം.",
    marketRisk: "വിപണി അപകടസാധ്യത",
    changingDemand: "മാറുന്ന പ്രാദേശിക ആവശ്യം",
    marketRiskDesc:
      "കാലാവസ്ഥ, വിലകൾ, പ്രാദേശിക മത്സരം എന്നിവ കാരണം ഉപഭോക്തൃ ആവശ്യം മാറാം.",
    financialRisk: "സാമ്പത്തിക അപകടസാധ്യത",
    initialInvestment: "പ്രാരംഭ നിക്ഷേപം",
    financialRiskDesc:
      "ബിസിനസ് ആരംഭിക്കുകയും വളർത്തുകയും ചെയ്യുമ്പോൾ മതിയായ പ്രവർത്തന മൂലധനം സൂക്ഷിക്കുക.",
    seasonalRisk: "കാലാനുസൃത അപകടസാധ്യത",
    seasonDependentSales: "കാലാവസ്ഥയെ ആശ്രയിച്ചുള്ള വിൽപ്പന",
    seasonalRiskDesc:
      "ചില ബിസിനസുകളിൽ വിവിധ കാലങ്ങളിൽ ആവശ്യം മാറാം.",
    low: "കുറഞ്ഞത്",
    aiSwot: "AI SWOT വിശകലനം",
    businessAtGlance: "നിങ്ങളുടെ ബിസിനസ് ഒരു നോട്ടത്തിൽ",
    strongLocalDemand: "ശക്തമായ പ്രാദേശിക ആവശ്യം",
    repeatCustomers: "വീണ്ടും വരുന്ന ഉപഭോക്താക്കളുടെ സാധ്യത",
    manageableScale: "ചെറിയ തോതിൽ ആരംഭിക്കാം",
    limitedResources: "പരിമിതമായ വിഭവങ്ങൾ",
    consistentQuality: "സ്ഥിരമായ ഗുണനിലവാരം നിലനിർത്തണം",
    limitedMarketReach: "ആദ്യഘട്ട വിപണി എത്തിച്ചേരൽ പരിമിതം",
    growingLocalDemand: "വളരുന്ന പ്രാദേശിക ആവശ്യം",
    digitalMarketing: "ഡിജിറ്റൽ മാർക്കറ്റിംഗ് അവസരങ്ങൾ",
    governmentSupport: "സർക്കാർ സഹായ അവസരങ്ങൾ",
    newCompetitors: "പുതിയ മത്സരാർത്ഥികൾ",
    priceFluctuations: "വിലയിലെ മാറ്റങ്ങൾ",
    seasonalChanges: "കാലാനുസൃത മാറ്റങ്ങൾ",
    trySimulator: "ബിസിനസ് സിമുലേറ്റർ പരീക്ഷിക്കുക",

    businessSimulator: "ബിസിനസ് സിമുലേറ്റർ",
    whatIfSimulator: "ബിസിനസ് സിമുലേറ്റർ",
    testIdea: "നിക്ഷേപിക്കുന്നതിന് മുമ്പ് നിങ്ങളുടെ ആശയം പരീക്ഷിക്കുക.",
    simulatorDesc:
      "താഴെയുള്ള സംഖ്യകൾ മാറ്റി നിങ്ങളുടെ കണക്കാക്കിയ ബിസിനസ് പ്രകടനം എങ്ങനെ മാറുന്നു എന്ന് കാണുക.",
    initialInvestment: "പ്രാരംഭ നിക്ഷേപം",
    customersPerDay: "പ്രതിദിന ഉപഭോക്താക്കൾ",
    averagePrice: "ഓരോ ഉപഭോക്താവിനുമുള്ള ശരാശരി വില",
    monthlyExpenses: "പ്രതിമാസ ചെലവുകൾ",
    monthlyRevenue: "പ്രതിമാസ വരുമാനം",
    monthlyProfit: "പ്രതിമാസ ലാഭം",
    yearlyProfit: "വാർഷിക ലാഭം",
    gramSaarthiInsight: "GramSaarthi വിവരം",
    simulatorNote:
      "നിങ്ങളുടെ അനുമാനങ്ങളെ അടിസ്ഥാനമാക്കിയുള്ള പ്രോട്ടോടൈപ്പ് കണക്കാണിത്. യഥാർത്ഥ ഫലങ്ങൾ പ്രാദേശിക ആവശ്യം, വില, പ്രവർത്തന ചെലവ്, മറ്റ് ബിസിനസ് സാഹചര്യങ്ങൾ എന്നിവയെ ആശ്രയിച്ച് മാറാം.",
    planFinances: "നിങ്ങളുടെ സാമ്പത്തിക പദ്ധതി തയ്യാറാക്കുക",

    financialPlanner: "സാമ്പത്തിക ആസൂത്രകൻ",
    smartFinancialPlanning: "സ്മാർട്ട് സാമ്പത്തിക ആസൂത്രണം",
    planFunding: "വായ്പ എടുക്കുന്നതിന് മുമ്പ് നിങ്ങളുടെ ധനസഹായം ആസൂത്രണം ചെയ്യുക.",
    financeDesc:
      "നിങ്ങളുടെ കണക്കാക്കിയ നിക്ഷേപം, സ്വന്തം സംഭാവന, ആവശ്യമായ സാമ്പത്തിക സഹായം എന്നിവ മനസ്സിലാക്കുക.",
    estimatedProjectCost: "കണക്കാക്കിയ പദ്ധതി ചെലവ്",
    yourContribution: "നിങ്ങളുടെ സംഭാവന",
    estimatedFundingGap: "കണക്കാക്കിയ ധനവിടവ്",
    loanPreview: "വായ്പ അവലോകനം",
    possibleRepayment: "സാധ്യമായ തിരിച്ചടവ് സാഹചര്യം",
    loanAmount: "വായ്പ തുക",
    interestRate: "പലിശ നിരക്ക്",
    tenure: "കാലാവധി",
    scheme: "പദ്ധതി",
    moratorium: "മൊറട്ടോറിയം",
    estimatedEmi: "കണക്കാക്കിയ EMI",
    repaymentRoadmap: "തിരിച്ചടവ് മാർഗരേഖ",
    repaymentJourney: "നിങ്ങളുടെ കണക്കാക്കിയ തിരിച്ചടവ് യാത്ര",
    initialMoratorium: "പ്രാരംഭ മൊറട്ടോറിയം",
    repaymentPeriod: "തിരിച്ചടവ് കാലയളവ്",
    monthlyEmi: "പ്രതിമാസ EMI",
    annualEmi: "വാർഷിക EMI",
    illustrative: "ഉദാഹരണാത്മകം",
    schemeNote:
      "ഇത് ഒരു ഉദാഹരണാത്മക തിരിച്ചടവ് കണക്കാണ്. യഥാർത്ഥ വായ്പാ നിബന്ധനകൾ, പലിശ, സബ്സിഡി, മൊറട്ടോറിയം എന്നിവ വായ്പദാതാവിനെയും പദ്ധതി യോഗ്യതയെയും ആശ്രയിച്ചിരിക്കും.",
    downloadReport: "പൂർണ്ണ റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക",
    downloadCompleteReport: "പൂർണ്ണ റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക",
    listen: "കേൾക്കൂ",
    audioLoading: "ഓഡിയോ സൃഷ്ടിച്ചുകൊണ്ടിരിക്കുന്നു...",
    audioNotSupported: "ഈ ബ്രൗസറിൽ വോയ്സ് ഔട്ട്പുട്ട് സപ്പോർട്ട് ചെയ്യില്ല.",
    audioError: "സൃഷ്ടിച്ച ഓഡിയോ പ്ലേ ചെയ്യാൻ കഴിഞ്ഞില്ല.",
    supportOpportunities: "പിന്തുണാ അവസരങ്ങൾ",
    exploreSupport: "സാധ്യമായ പിന്തുണാ പദ്ധതികൾ കാണുക",
    governmentBankSupport: "സർക്കാർ / ബാങ്ക് പിന്തുണ",
    supportDesc:
      "നിങ്ങളുടെ സ്ഥലം, ബിസിനസ് തരം, യോഗ്യത എന്നിവ അനുസരിച്ച് സർക്കാർ പദ്ധതികൾ, സബ്സിഡികൾ അല്ലെങ്കിൽ ഔപചാരിക ക്രെഡിറ്റ് പദ്ധതികൾ പരിശോധിക്കാം.",
    explore: "കാണുക",
    supportNote:
      "പദ്ധതിയുടെ യോഗ്യതയും ലഭ്യതയും ഔദ്യോഗിക സർക്കാർ അല്ലെങ്കിൽ ബാങ്കിംഗ് ഉറവിടങ്ങളിൽ പരിശോധിക്കണം.",
    gramSaarthiRecommendation: "GramSaarthi ശുപാർശ",
    financeAdvice:
      "ചെറിയ പ്രായോഗിക നിക്ഷേപത്തോടെ ആരംഭിക്കുക, അടിയന്തര പ്രവർത്തന മൂലധനം സൂക്ഷിക്കുക, വായ്പ എടുക്കുന്നതിന് മുമ്പ് സാമ്പത്തിക ഓപ്ഷനുകൾ താരതമ്യം ചെയ്യുക.",
    generateRoadmap: "എന്റെ ബിസിനസ് മാർഗരേഖ തയ്യാറാക്കുക",

    yourBusinessRoadmap: "നിങ്ങളുടെ ബിസിനസ് മാർഗരേഖ",
    personalizedRoadmap: "വ്യക്തിഗത മാർഗരേഖ",
    pathIdeaAction: "ആശയത്തിൽ നിന്ന് പ്രവർത്തിയിലേക്കുള്ള നിങ്ങളുടെ വഴി.",
    roadmapDesc:
      "നിങ്ങൾ നൽകിയ വിവരങ്ങളുടെ അടിസ്ഥാനത്തിലുള്ള ലളിതമായ തുടക്ക പദ്ധതി ഇതാണ്.",
    recommendedBusiness: "ശുപാർശ ചെയ്ത ബിസിനസ്",
    startingPoint: "നിങ്ങളുടെ തുടക്ക സ്ഥിതി",
    notSpecified: "വ്യക്തമാക്കിയിട്ടില്ല",
    actionPlan: "30 ദിവസത്തെ പ്രവർത്തന പദ്ധതി",
    startSmall: "ചെറുതായി തുടങ്ങുക. പഠിക്കുക. പിന്നീട് വളരുക.",
    validateDemand: "പ്രാദേശിക ആവശ്യം പരിശോധിക്കുക",
    validateDemandDesc:
      "വലിയ ചെലവ് ചെയ്യുന്നതിന് മുമ്പ് സാധ്യതയുള്ള ഉപഭോക്താക്കളുമായി സംസാരിച്ച് അവർക്ക് യഥാർത്ഥത്തിൽ എന്താണ് വേണ്ടതെന്ന് മനസ്സിലാക്കുക.",
    smallPilot: "ചെറിയ പൈലറ്റിൽ തുടങ്ങുക",
    smallPilotDesc:
      "നിങ്ങളുടെ ഉൽപ്പന്നമോ സേവനമോ ചെറിയ തോതിൽ പരീക്ഷിച്ച് ചെലവും വിൽപ്പനയും രേഖപ്പെടുത്തുക.",
    trackNumbers: "നിങ്ങളുടെ കണക്കുകൾ നിരീക്ഷിക്കുക",
    trackNumbersDesc:
      "അനുമാനങ്ങളിൽ മാത്രം ആശ്രയിക്കാതെ ഉപഭോക്താക്കൾ, വരുമാനം, ചെലവുകൾ, മാസ ലാഭം എന്നിവ നിരീക്ഷിക്കുക.",
    scaleCarefully: "ശ്രദ്ധാപൂർവം വളരുക",
    scaleCarefullyDesc:
      "ലാഭം വീണ്ടും നിക്ഷേപിക്കുകയും ബിസിനസിൽ സ്ഥിരമായ ആവശ്യം തെളിഞ്ഞ ശേഷം മാത്രമേ അധിക ധനസഹായം പരിഗണിക്കാവൂ.",
    estimatedMonthlyRevenue: "കണക്കാക്കിയ പ്രതിമാസ വരുമാനം",
    estimatedMonthlyProfit: "കണക്കാക്കിയ പ്രതിമാസ ലാഭം",
    businessRisk: "ബിസിനസ് അപകടസാധ്യത",
    finalAdvice: "GramSaarthi അന്തിമ ഉപദേശം",
    finalAdviceDesc:
      "ഏറ്റവും വലിയ നിക്ഷേപത്തോടെ ആരംഭിക്കരുത്. പ്രായോഗിക പൈലറ്റിൽ തുടങ്ങുക, ആവശ്യം പരിശോധിക്കുക, ചെലവുകൾ നിയന്ത്രിക്കുക, കണക്കുകൾ അനുകൂലമായപ്പോൾ വളരുക.",
    backToGramSaarthi: "GramSaarthi-ലേക്ക് മടങ്ങുക",

    features: "സവിശേഷതകൾ",
    howItWorks: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    startAssessment: "വിലയിരുത്തൽ ആരംഭിക്കുക",
    aiPoweredAdvisor: "AI അധിഷ്ഠിത ഗ്രാമീണ ബിസിനസ് ഉപദേഷ്ടാവ്",
    smarterBusiness: "നിങ്ങളുടെ ആശയത്തെ മികച്ച ബിസിനസാക്കി മാറ്റുക.",
    heroDesc:
      "GramSaarthi AI ഗ്രാമീണ സംരംഭകർക്ക് ശരിയായ ബിസിനസ് കണ്ടെത്താനും പ്രാദേശിക വിപണി മനസ്സിലാക്കാനും അപകടസാധ്യതകൾ കൈകാര്യം ചെയ്യാനും വായ്പ എടുക്കുന്നതിന് മുമ്പ് സാമ്പത്തിക പദ്ധതി തയ്യാറാക്കാനും സഹായിക്കുന്നു.",
    startBusinessAssessment: "ബിസിനസ് വിലയിരുത്തൽ ആരംഭിക്കുക",
    exploreFeatures: "സവിശേഷതകൾ കാണുക",
    simpleToUse: "ഉപയോഗിക്കാൻ എളുപ്പം",
    localInsights: "പ്രാദേശിക വിവരങ്ങൾ",
    smartFinancialPlanning: "സ്മാർട്ട് സാമ്പത്തിക ആസൂത്രണം",
    aiBusinessAdvisor: "AI ബിസിനസ് ഉപദേഷ്ടാവ്",
    online: "ഓൺലൈൻ",
    namaste: "നമസ്കാരം!",
    askGramSaarthi: "GramSaarthi-യോട് ചോദിക്കൂ...",
    whatWeOffer: "ഞങ്ങൾ നൽകുന്നത്",
    everythingBeforeInvest: "നിക്ഷേപിക്കുന്നതിന് മുമ്പ് നിങ്ങൾക്ക് ആവശ്യമായ എല്ലാം.",
    aiBusinessMatching: "AI ബിസിനസ് പൊരുത്തം",
    aiBusinessMatchingDesc:
      "നിങ്ങളുടെ മൂലധനം, കഴിവുകൾ, വിഭവങ്ങൾ, പ്രാദേശിക അവസരങ്ങൾ എന്നിവയുമായി പൊരുത്തപ്പെടുന്ന ബിസിനസുകൾ കണ്ടെത്തുക.",
    localMarketAnalysis: "പ്രാദേശിക വിപണി വിശകലനം",
    localMarketAnalysisDesc:
      "നിങ്ങളുടെ ഗ്രാമത്തിന് ചുറ്റുമുള്ള ആവശ്യം, മത്സരം, വിപണി അവസരങ്ങൾ എന്നിവ മനസ്സിലാക്കുക.",
    businessSimulatorDesc:
      "പണം നിക്ഷേപിക്കുന്നതിന് മുമ്പ് വ്യത്യസ്ത വിലകൾ, ഉപഭോക്താക്കൾ, ചെലവുകൾ എന്നിവ പരീക്ഷിക്കുക.",
    smartFinancialPlanningDesc:
      "പദ്ധതി ചെലവ്, സാധ്യതയുള്ള ധനസഹായം, തിരിച്ചടവ് പദ്ധതി എന്നിവ മനസ്സിലാക്കുക.",
    howItWorksTitle: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    fourSteps: "ആശയത്തിൽ നിന്ന് പ്രവർത്തിയിലേക്ക് 4 ലളിത ഘട്ടങ്ങൾ.",
    tellUsAboutYou: "നിങ്ങളെക്കുറിച്ച് പറയൂ",
    tellUsAboutYouDesc:
      "നിങ്ങളുടെ സ്ഥലം, മൂലധനം, കഴിവുകൾ, വിഭവങ്ങൾ എന്നിവ പങ്കിടുക.",
    discoverOpportunities: "അവസരങ്ങൾ കണ്ടെത്തുക",
    discoverOpportunitiesDesc:
      "ഞങ്ങളുടെ സംവിധാനം അനുയോജ്യമായ പ്രാദേശിക ബിസിനസ് അവസരങ്ങൾ വിശകലനം ചെയ്യുന്നു.",
    testYourIdea: "നിങ്ങളുടെ ആശയം പരീക്ഷിക്കുക",
    testYourIdeaDesc:
      "ലാഭം, അപകടസാധ്യതകൾ, വിവിധ ബിസിനസ് സാഹചര്യങ്ങൾ എന്നിവ സിമുലേറ്റ് ചെയ്യുക.",
    planWithConfidence: "ആത്മവിശ്വാസത്തോടെ ആസൂത്രണം ചെയ്യുക",
    planWithConfidenceDesc:
      "നിങ്ങളുടെ വ്യക്തിഗത ബിസിനസ്, സാമ്പത്തിക മാർഗരേഖ നേടുക.",
    footerText:
      "ഗ്രാമീണ തലത്തിൽ മികച്ച സംരംഭകത്വത്തെ ശക്തിപ്പെടുത്തുന്നു.",

    dairyBusiness: "ഡയറി ബിസിനസ്",
    groceryStore: "പലചരക്ക് കട",
    tailoringBusiness: "തയ്യൽ ബിസിനസ്",
    poultryBusiness: "കോഴിവളർത്തൽ ബിസിനസ്",
    foodProcessing: "ഭക്ഷ്യ സംസ്കരണം",
    smallGroceryStore: "ചെറിയ പലചരക്ക് കട",
    dairyReason:
      "പ്രാദേശിക ആവശ്യം, വിഭവങ്ങൾ എന്നിവ ലഭ്യമാണെങ്കിൽ ഡയറി ബിസിനസിന് നല്ല സാധ്യതയുണ്ട്.",
    groceryReason:
      "പലചരക്ക് ബിസിനസിന് പ്രാദേശിക കുടുംബങ്ങളുടെ സ്ഥിരമായ ആവശ്യത്തിൽ നിന്ന് പ്രയോജനം ലഭിക്കും.",
    tailoringReason:
      "തയ്യൽ ബിസിനസ് താരതമ്യേന കുറഞ്ഞ പ്രാരംഭ നിക്ഷേപത്തിലും കഴിവ് അടിസ്ഥാനമാക്കിയുള്ള ജോലിയിലും ആരംഭിക്കാം.",
    poultryReason:
      "കോഴിവളർത്തലിന് നല്ല പ്രാദേശിക ആവശ്യം ഉണ്ടാകാം, എന്നാൽ ചെലവും ആരോഗ്യവും ശ്രദ്ധാപൂർവം കൈകാര്യം ചെയ്യണം.",
    foodProcessingReason:
      "പ്രാദേശിക ഭക്ഷ്യസംസ്കരണം കാർഷിക ഉൽപ്പന്നങ്ങൾക്ക് മൂല്യം കൂട്ടുകയും സമീപ വിപണികൾക്ക് സേവനം നൽകുകയും ചെയ്യും.",
    smallGroceryReason:
      "ചെറിയ പലചരക്ക് കടയ്ക്ക് പ്രാദേശിക സമൂഹത്തിന്റെ ദൈനംദിന ആവശ്യങ്ങൾ നിറവേറ്റാൻ കഴിയും.",
    microFinance: "മൈക്രോ ഫിനാൻസ്",
    termLoan: "ടേം ലോൺ",
    aiAnalysisFailed: "AI വിശകലനം പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക.",
    backendError:
      "GramSaarthi AI-യുമായി ബന്ധപ്പെടാനായില്ല. backend പ്രവർത്തിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കുക.",
    aiReportError:
      "AI റിപ്പോർട്ട് പ്രദർശിപ്പിക്കാനായില്ല. വീണ്ടും വിശകലനം ചെയ്യുക.",
  },

  Odia: {
    step1: "ପଦକ୍ଷେପ 1 / 3",
    assessment: "ବ୍ୟବସାୟ ମୂଲ୍ୟାଙ୍କନ",
    tellSituation: "ଆପଣଙ୍କ ପରିସ୍ଥିତି ବିଷୟରେ କୁହନ୍ତୁ।",
    assessmentDesc:
      "ଆପଣଙ୍କ ସମ୍ବଳ ଏବଂ ସ୍ଥାନୀୟ ବଜାର ସହିତ ମେଳ ଖାଉଥିବା ବ୍ୟବସାୟ ସୁଯୋଗ ଖୋଜିବା ପାଇଁ ଆମେ ଏହି ସୂଚନା ବ୍ୟବହାର କରିବୁ।",
    location: "ଆପଣ କେଉଁଠାରେ ବ୍ୟବସାୟ ଆରମ୍ଭ କରିବାକୁ ଚାହୁଁଛନ୍ତି?",
    locationPlaceholder: "ଗାଁ / ସହର ଲେଖନ୍ତୁ",
    capital: "ଆପଣଙ୍କ ପାଖରେ କେତେ ନିଜସ୍ୱ ପୁଞ୍ଜି ଅଛି?",
    capitalPlaceholder: "ଉଦାହରଣ: ₹80,000",
    language: "ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ",
    skills: "ଆପଣଙ୍କ ପାଖରେ କେଉଁ ଦକ୍ଷତା କିମ୍ବା ଅଭିଜ୍ଞତା ଅଛି?",
    skillsPlaceholder: "ଉଦାହରଣ: କୃଷି, ସିଲେଇ, ରୋଷେଇ...",
    resources: "ଆପଣଙ୍କ ପାଖରେ ପୂର୍ବରୁ କେଉଁ ସମ୍ବଳ ଅଛି?",
    resourcesPlaceholder: "ଉଦାହରଣ: ଜମି, ଦୋକାନ, ପଶୁଧନ...",
    businessIdea: "ଆପଣଙ୍କ ପାଖରେ ପୂର୍ବରୁ କୌଣସି ବ୍ୟବସାୟ ଧାରଣା ଅଛି କି?",
    selectBusiness: "ବ୍ୟବସାୟ ବାଛନ୍ତୁ",
    continue: "ଆଗକୁ ବଢନ୍ତୁ",

    assessmentComplete: "ମୂଲ୍ୟାଙ୍କନ ସମ୍ପୂର୍ଣ୍ଣ",
    businessMatch: "ଆପଣଙ୍କ ବ୍ୟବସାୟ ମେଳ",
    found: "ଆମେ ଏହା ପାଇଛୁ।",
    matchDesc:
      "ଆପଣଙ୍କ ସୂଚନା ଆଧାରରେ ଏହି ବ୍ୟବସାୟଗୁଡ଼ିକ ଆପଣଙ୍କ ପରିସ୍ଥିତି ପାଇଁ ଉପଯୁକ୍ତ ହୋଇପାରେ।",
    recommended: "#1 ସୁପାରିଶ",
    matchScore: "ମେଳ ସ୍କୋର",
    marketReach: "ବଜାର ପହଞ୍ଚ",
    primaryCustomers: "ମୁଖ୍ୟ ଗ୍ରାହକ",
    distributionChannels: "ବଣ୍ଟନ ମାଧ୍ୟମ",
    opportunity: "ସୁଯୋଗ ବିଶ୍ଳେଷଣ",
    swot: "SWOT ବିଶ୍ଳେଷଣ",
    localDemand: "ସ୍ଥାନୀୟ ଚାହିଦା",
    capitalFit: "ପୁଞ୍ଜି ଉପଯୁକ୍ତତା",
    resourceFit: "ସମ୍ବଳ ଉପଯୁକ୍ତତା",
    risk: "ବିପଦ",
    exploreBusiness: "ବ୍ୟବସାୟ ଦେଖନ୍ତୁ",
    strengths: "ଶକ୍ତି",
    weaknesses: "ଦୁର୍ବଳତା",
    opportunities: "ସୁଯୋଗ",
    threats: "ବିପଦ",
    localThreats: "ସ୍ଥାନୀୟ ବିପଦ",
    competitors: "ପ୍ରତିଯୋଗୀ ବିଶ୍ଳେଷଣ",
    mainCompetitors: "ମୁଖ୍ୟ ପ୍ରତିଯୋଗୀ",
    competitiveAdvantage: "ଆପଣଙ୍କ ପ୍ରତିଯୋଗୀତାମୂଳକ ଲାଭ",
    pricing: "ମୂଲ୍ୟ ନିର୍ଦ୍ଧାରଣ ରଣନୀତି",
    strategy: "ରଣନୀତି:",
    suggestedPricing: "ପ୍ରସ୍ତାବିତ ମୂଲ୍ୟ:",
    why: "କାହିଁକି:",
    recommendation: "GramSaarthi ସୁପାରିଶ",
    recommendedSteps: "ସୁପାରିଶ କରାଯାଇଥିବା ପଦକ୍ଷେପ",

    marketAnalysis: "ବଜାର ବିଶ୍ଳେଷଣ",
    hyperLocalMarket: "ସ୍ଥାନୀୟ ବଜାର ବିଶ୍ଳେଷଣ",
    understandMarket: "ଆପଣଙ୍କ ସ୍ଥାନୀୟ ବଜାରକୁ ବୁଝନ୍ତୁ।",
    marketDesc:
      "ଆପଣ ବାଛିଥିବା ସ୍ଥାନ ଚାରିପାଖରେ ଥିବା ସୁଯୋଗର ଏହା ଏକ ଡେମୋ ବିଶ୍ଳେଷଣ।",
    yourVillage: "ଆପଣଙ୍କ ଗାଁ",
    localMarketArea: "ସ୍ଥାନୀୟ ବଜାର ଅଞ୍ଚଳ",
    estimatedDemand: "ଆନୁମାନିକ ଚାହିଦା",
    high: "ଅଧିକ",
    competition: "ପ୍ରତିଯୋଗିତା",
    medium: "ମଧ୍ୟମ",
    growthPotential: "ବିକାଶ ସମ୍ଭାବନା",
    strong: "ଶକ୍ତିଶାଳୀ",
    seasonalDemand: "ଋତୁକାଳୀନ ଚାହିଦା",
    whenDemandHighest: "ଚାହିଦା କେବେ ସର୍ବାଧିକ ଥାଏ?",
    demoData: "ଡେମୋ ଡାଟା",
    summer: "ଗ୍ରୀଷ୍ମ",
    monsoon: "ବର୍ଷା",
    winter: "ଶୀତ",
    festival: "ପର୍ବ",
    competitorMap: "ପ୍ରତିଯୋଗୀ ମାନଚିତ୍ର",
    nearbyBusinessActivity: "ନିକଟସ୍ଥ ବ୍ୟବସାୟିକ କାର୍ଯ୍ୟକଳାପ",
    illustrative: "ଉଦାହରଣାତ୍ମକ",
    localMarketRadius: "5–10 କିମି ସ୍ଥାନୀୟ ବଜାର",
    yourLocation: "ଆପଣଙ୍କ ସ୍ଥାନ",
    mapNote:
      "ଏହି ପ୍ରୋଟୋଟାଇପରେ ଉଦାହରଣାତ୍ମକ ଡାଟା ବ୍ୟବହାର କରାଯାଇଛି। ପ୍ରକୃତ ପ୍ରତିଯୋଗୀ ଏବଂ ବଜାର ଡାଟା ପରେ API ମାଧ୍ୟମରେ ଯୋଡ଼ାଯାଇପାରିବ।",
    analyzeRisks: "ବ୍ୟବସାୟ ବିପଦ ବିଶ୍ଳେଷଣ କରନ୍ତୁ",

    riskAnalysis: "ବିପଦ ବିଶ୍ଳେଷଣ",
    aiRiskAnalysis: "AI ବିପଦ ବିଶ୍ଳେଷଣ",
    knowRisks: "ନିବେଶ ପୂର୍ବରୁ ବିପଦ ଜାଣନ୍ତୁ।",
    riskDesc:
      "ଆପଣ ବାଛିଥିବା ବ୍ୟବସାୟ ସହିତ ଜଡ଼ିତ ମୁଖ୍ୟ ବିପଦ ଏବଂ ସେଗୁଡ଼ିକୁ କିପରି ପରିଚାଳନା କରିବେ ବୁଝନ୍ତୁ।",
    overallRisk: "ସାମଗ୍ରିକ ବ୍ୟବସାୟ ବିପଦ",
    manageablePlanning:
      "ସାବଧାନ ଯୋଜନା ମାଧ୍ୟମରେ ଏହି ବିପଦକୁ ପରିଚାଳନା କରାଯାଇପାରେ।",
    marketRisk: "ବଜାର ବିପଦ",
    changingDemand: "ପରିବର୍ତ୍ତନଶୀଳ ସ୍ଥାନୀୟ ଚାହିଦା",
    marketRiskDesc:
      "ଋତୁ, ମୂଲ୍ୟ ଏବଂ ସ୍ଥାନୀୟ ପ୍ରତିଯୋଗିତା ଯୋଗୁଁ ଗ୍ରାହକ ଚାହିଦା ବଦଳିପାରେ।",
    financialRisk: "ଆର୍ଥିକ ବିପଦ",
    initialInvestment: "ପ୍ରାରମ୍ଭିକ ନିବେଶ",
    financialRiskDesc:
      "ବ୍ୟବସାୟ ଆରମ୍ଭ ଏବଂ ବୃଦ୍ଧି ସମୟରେ ପର୍ଯ୍ୟାପ୍ତ କାର୍ଯ୍ୟକାରୀ ପୁଞ୍ଜି ରଖନ୍ତୁ।",
    seasonalRisk: "ଋତୁକାଳୀନ ବିପଦ",
    seasonDependentSales: "ଋତୁ ଉପରେ ନିର୍ଭରଶୀଳ ବିକ୍ରୟ",
    seasonalRiskDesc:
      "କିଛି ବ୍ୟବସାୟରେ ବିଭିନ୍ନ ଋତୁରେ ଚାହିଦା ବଦଳିପାରେ।",
    low: "କମ୍",
    aiSwot: "AI SWOT ବିଶ୍ଳେଷଣ",
    businessAtGlance: "ଆପଣଙ୍କ ବ୍ୟବସାୟ ଏକ ନଜରରେ",
    strongLocalDemand: "ଶକ୍ତିଶାଳୀ ସ୍ଥାନୀୟ ଚାହିଦା",
    repeatCustomers: "ପୁନଃ ଗ୍ରାହକ ଆସିବାର ସମ୍ଭାବନା",
    manageableScale: "ଛୋଟ ପରିମାଣରେ ଆରମ୍ଭ କରିହେବ",
    limitedResources: "ସୀମିତ ସମ୍ବଳ",
    consistentQuality: "ନିରନ୍ତର ଗୁଣବତ୍ତା ରଖିବା ଆବଶ୍ୟକ",
    limitedMarketReach: "ପ୍ରାରମ୍ଭିକ ବଜାର ପହଞ୍ଚ ସୀମିତ",
    growingLocalDemand: "ବଢୁଥିବା ସ୍ଥାନୀୟ ଚାହିଦା",
    digitalMarketing: "ଡିଜିଟାଲ ମାର୍କେଟିଂ ସୁଯୋଗ",
    governmentSupport: "ସରକାରୀ ସହାୟତା ସୁଯୋଗ",
    newCompetitors: "ନୂଆ ପ୍ରତିଯୋଗୀ",
    priceFluctuations: "ମୂଲ୍ୟର ଉତ୍ଥାନ-ପତନ",
    seasonalChanges: "ଋତୁକାଳୀନ ପରିବର୍ତ୍ତନ",
    trySimulator: "ବ୍ୟବସାୟ ସିମୁଲେଟର ଚେଷ୍ଟା କରନ୍ତୁ",

    businessSimulator: "ବ୍ୟବସାୟ ସିମୁଲେଟର",
    whatIfSimulator: "ବ୍ୟବସାୟ ସିମୁଲେଟର",
    testIdea: "ନିବେଶ ପୂର୍ବରୁ ଆପଣଙ୍କ ଧାରଣା ପରୀକ୍ଷା କରନ୍ତୁ।",
    simulatorDesc:
      "ନିମ୍ନର ସଂଖ୍ୟା ବଦଳାଇ ଆପଣଙ୍କ ଆନୁମାନିକ ବ୍ୟବସାୟ ପ୍ରଦର୍ଶନ କିପରି ବଦଳେ ଦେଖନ୍ତୁ।",
    initialInvestment: "ପ୍ରାରମ୍ଭିକ ନିବେଶ",
    customersPerDay: "ଦିନକୁ ଗ୍ରାହକ",
    averagePrice: "ପ୍ରତି ଗ୍ରାହକ ହାରାହାରି ମୂଲ୍ୟ",
    monthlyExpenses: "ମାସିକ ଖର୍ଚ୍ଚ",
    monthlyRevenue: "ମାସିକ ଆୟ",
    monthlyProfit: "ମାସିକ ଲାଭ",
    yearlyProfit: "ବାର୍ଷିକ ଲାଭ",
    gramSaarthiInsight: "GramSaarthi ସୂଚନା",
    simulatorNote:
      "ଏହା ଆପଣଙ୍କ ଧାରଣା ଆଧାରିତ ଏକ ପ୍ରୋଟୋଟାଇପ ଆନୁମାନ। ପ୍ରକୃତ ଫଳାଫଳ ସ୍ଥାନୀୟ ଚାହିଦା, ମୂଲ୍ୟ, ପରିଚାଳନା ଖର୍ଚ୍ଚ ଏବଂ ଅନ୍ୟାନ୍ୟ ବ୍ୟବସାୟ ପରିସ୍ଥିତି ଅନୁସାରେ ବଦଳିପାରେ।",
    planFinances: "ଆପଣଙ୍କ ଆର୍ଥିକ ଯୋଜନା କରନ୍ତୁ",

    financialPlanner: "ଆର୍ଥିକ ଯୋଜନାକାରୀ",
    smartFinancialPlanning: "ସ୍ମାର୍ଟ ଆର୍ଥିକ ଯୋଜନା",
    planFunding: "ଋଣ ନେବା ପୂର୍ବରୁ ଆପଣଙ୍କ ଅର୍ଥ ଯୋଜନା କରନ୍ତୁ।",
    financeDesc:
      "ଆପଣଙ୍କ ଆନୁମାନିକ ନିବେଶ, ନିଜସ୍ୱ ଅବଦାନ ଏବଂ ସମ୍ଭାବ୍ୟ ଅର୍ଥ ଆବଶ୍ୟକତା ବୁଝନ୍ତୁ।",
    estimatedProjectCost: "ଆନୁମାନିକ ପ୍ରକଳ୍ପ ଖର୍ଚ୍ଚ",
    yourContribution: "ଆପଣଙ୍କ ଅବଦାନ",
    estimatedFundingGap: "ଆନୁମାନିକ ଅର୍ଥ ଅଭାବ",
    loanPreview: "ଋଣ ସମୀକ୍ଷା",
    possibleRepayment: "ସମ୍ଭାବ୍ୟ ପରିଶୋଧ ପରିସ୍ଥିତି",
    loanAmount: "ଋଣ ରାଶି",
    interestRate: "ସୁଧ ହାର",
    tenure: "ଅବଧି",
    scheme: "ଯୋଜନା",
    moratorium: "ମୋରାଟୋରିୟମ",
    estimatedEmi: "ଆନୁମାନିକ EMI",
    repaymentRoadmap: "ପରିଶୋଧ ରୋଡମ୍ୟାପ",
    repaymentJourney: "ଆପଣଙ୍କ ଆନୁମାନିକ ପରିଶୋଧ ଯାତ୍ରା",
    initialMoratorium: "ପ୍ରାରମ୍ଭିକ ମୋରାଟୋରିୟମ",
    repaymentPeriod: "ପରିଶୋଧ ଅବଧି",
    monthlyEmi: "ମାସିକ EMI",
    annualEmi: "ବାର୍ଷିକ EMI",
    illustrative: "ଉଦାହରଣାତ୍ମକ",
    schemeNote:
      "ଏହା ଏକ ଉଦାହରଣାତ୍ମକ ପରିଶୋଧ ଆନୁମାନ। ପ୍ରକୃତ ଋଣ ସର୍ତ୍ତ, ସୁଧ, ସବସିଡି ଏବଂ ମୋରାଟୋରିୟମ ଋଣଦାତା ଏବଂ ଯୋଜନା ଯୋଗ୍ୟତା ଉପରେ ନିର୍ଭର କରେ।",
    downloadReport: "ସମ୍ପୂର୍ଣ୍ଣ ରିପୋର୍ଟ ଡାଉନଲୋଡ କରନ୍ତୁ",
    downloadCompleteReport: "ସମ୍ପୂର୍ଣ୍ଣ ରିପୋର୍ଟ ଡାଉନଲୋଡ କରନ୍ତୁ",
    listen: "ଶୁଣନ୍ତୁ",
    audioLoading: "ଅଡିଓ ତିଆରୀ ହେଉଛି...",
    audioNotSupported: "ଏହି ବ୍ରାଉଜରରେ ଭଏସ୍ ଆଉଟପୁଟ ସମର୍ଥିତ ନାହିଁ।",
    audioError: "ତିଆରି ଅଡିଓ ପ୍ଲେ କରାଯାଇପାରିଲା ନାହିଁ।",
    supportOpportunities: "ସହାୟତା ସୁଯୋଗ",
    exploreSupport: "ସମ୍ଭାବ୍ୟ ସହାୟତା ଯୋଜନା ଦେଖନ୍ତୁ",
    governmentBankSupport: "ସରକାର / ବ୍ୟାଙ୍କ ସହାୟତା",
    supportDesc:
      "ଆପଣଙ୍କ ସ୍ଥାନ, ବ୍ୟବସାୟ ପ୍ରକାର ଏବଂ ଯୋଗ୍ୟତା ଅନୁସାରେ ଆପଣ ସରକାରୀ ଯୋଜନା, ସବସିଡି କିମ୍ବା ଔପଚାରିକ ଋଣ କାର୍ଯ୍ୟକ୍ରମ ଦେଖିପାରିବେ।",
    explore: "ଦେଖନ୍ତୁ",
    supportNote:
      "ଯୋଜନାର ଯୋଗ୍ୟତା ଏବଂ ଉପଲବ୍ଧତା ସର୍ବଦା ସରକାରୀ କିମ୍ବା ବ୍ୟାଙ୍କର ଅଧିକୃତ ଉତ୍ସରୁ ଯାଞ୍ଚ କରନ୍ତୁ।",
    gramSaarthiRecommendation: "GramSaarthi ସୁପାରିଶ",
    financeAdvice:
      "ସବୁଠାରୁ ଛୋଟ ବ୍ୟବହାରିକ ନିବେଶରୁ ଆରମ୍ଭ କରନ୍ତୁ, ଜରୁରୀ କାର୍ଯ୍ୟକାରୀ ପୁଞ୍ଜି ରଖନ୍ତୁ ଏବଂ ଋଣ ନେବା ପୂର୍ବରୁ ଆର୍ଥିକ ବିକଳ୍ପ ତୁଳନା କରନ୍ତୁ।",
    generateRoadmap: "ମୋର ବ୍ୟବସାୟ ରୋଡମ୍ୟାପ ତିଆରି କରନ୍ତୁ",

    yourBusinessRoadmap: "ଆପଣଙ୍କ ବ୍ୟବସାୟ ରୋଡମ୍ୟାପ",
    personalizedRoadmap: "ବ୍ୟକ୍ତିଗତ ରୋଡମ୍ୟାପ",
    pathIdeaAction: "ଧାରଣାରୁ କାର୍ଯ୍ୟ ପର୍ଯ୍ୟନ୍ତ ଆପଣଙ୍କ ରାସ୍ତା।",
    roadmapDesc:
      "ଆପଣ ଦେଇଥିବା ସୂଚନା ଆଧାରରେ ଏହା ଏକ ସରଳ ଆରମ୍ଭ ଯୋଜନା।",
    recommendedBusiness: "ସୁପାରିଶ କରାଯାଇଥିବା ବ୍ୟବସାୟ",
    startingPoint: "ଆପଣଙ୍କ ଆରମ୍ଭିକ ସ୍ଥିତି",
    notSpecified: "ଉଲ୍ଲେଖ ହୋଇନାହିଁ",
    actionPlan: "30 ଦିନର କାର୍ଯ୍ୟ ଯୋଜନା",
    startSmall: "ଛୋଟ ଆରମ୍ଭ କରନ୍ତୁ। ଶିଖନ୍ତୁ। ପରେ ବଢ଼ନ୍ତୁ।",
    validateDemand: "ସ୍ଥାନୀୟ ଚାହିଦା ଯାଞ୍ଚ କରନ୍ତୁ",
    validateDemandDesc:
      "ବଡ଼ ଖର୍ଚ୍ଚ କରିବା ପୂର୍ବରୁ ସମ୍ଭାବ୍ୟ ଗ୍ରାହକଙ୍କ ସହ କଥା ହୋଇ ସେମାନଙ୍କ ପ୍ରକୃତ ଆବଶ୍ୟକତା ବୁଝନ୍ତୁ।",
    smallPilot: "ଛୋଟ ପାଇଲଟ ସହ ଆରମ୍ଭ କରନ୍ତୁ",
    smallPilotDesc:
      "ଆପଣଙ୍କ ଉତ୍ପାଦ କିମ୍ବା ସେବାକୁ ଛୋଟ ପରିମାଣରେ ପରୀକ୍ଷା କରନ୍ତୁ ଏବଂ ଖର୍ଚ୍ଚ ଓ ବିକ୍ରୟ ରେକର୍ଡ କରନ୍ତୁ।",
    trackNumbers: "ଆପଣଙ୍କ ତଥ୍ୟ ଟ୍ରାକ କରନ୍ତୁ",
    trackNumbersDesc:
      "କେବଳ ଅନୁମାନ ଉପରେ ନିର୍ଭର ନକରି ଗ୍ରାହକ, ଆୟ, ଖର୍ଚ୍ଚ ଏବଂ ମାସିକ ଲାଭ ଉପରେ ନଜର ରଖନ୍ତୁ।",
    scaleCarefully: "ସାବଧାନରେ ବଢ଼ନ୍ତୁ",
    scaleCarefullyDesc:
      "ଲାଭକୁ ପୁନଃ ନିବେଶ କରନ୍ତୁ ଏବଂ ବ୍ୟବସାୟରେ ନିରନ୍ତର ଚାହିଦା ଦେଖାଦେଲେ ମାତ୍ର ଅତିରିକ୍ତ ଅର୍ଥ ବିଚାର କରନ୍ତୁ।",
    estimatedMonthlyRevenue: "ଆନୁମାନିକ ମାସିକ ଆୟ",
    estimatedMonthlyProfit: "ଆନୁମାନିକ ମାସିକ ଲାଭ",
    businessRisk: "ବ୍ୟବସାୟ ବିପଦ",
    finalAdvice: "GramSaarthi ର ଶେଷ ପରାମର୍ଶ",
    finalAdviceDesc:
      "ସବୁଠାରୁ ବଡ଼ ନିବେଶରୁ ଆରମ୍ଭ କରନ୍ତୁ ନାହିଁ। ଏକ ବ୍ୟବହାରିକ ପାଇଲଟରୁ ଆରମ୍ଭ କରନ୍ତୁ, ଚାହିଦା ଯାଞ୍ଚ କରନ୍ତୁ, ଖର୍ଚ୍ଚ ନିୟନ୍ତ୍ରଣ କରନ୍ତୁ ଏବଂ ତଥ୍ୟ ସମର୍ଥନ କଲେ ବଢ଼ନ୍ତୁ।",
    backToGramSaarthi: "GramSaarthi କୁ ଫେରନ୍ତୁ",

    features: "ବୈଶିଷ୍ଟ୍ୟ",
    howItWorks: "ଏହା କିପରି କାମ କରେ",
    startAssessment: "ମୂଲ୍ୟାଙ୍କନ ଆରମ୍ଭ କରନ୍ତୁ",
    aiPoweredAdvisor: "AI ଆଧାରିତ ଗ୍ରାମୀଣ ବ୍ୟବସାୟ ପରାମର୍ଶଦାତା",
    smarterBusiness: "ଆପଣଙ୍କ ଧାରଣାକୁ ଏକ ସ୍ମାର୍ଟ ବ୍ୟବସାୟରେ ପରିଣତ କରନ୍ତୁ।",
    heroDesc:
      "GramSaarthi AI ଗ୍ରାମୀଣ ଉଦ୍ୟୋଗୀମାନଙ୍କୁ ଠିକ ବ୍ୟବସାୟ ଖୋଜିବା, ସ୍ଥାନୀୟ ବଜାର ବୁଝିବା, ବିପଦ ପରିଚାଳନା କରିବା ଏବଂ ଋଣ ନେବା ପୂର୍ବରୁ ଆର୍ଥିକ ଯୋଜନା କରିବାରେ ସାହାଯ୍ୟ କରେ।",
    startBusinessAssessment: "ବ୍ୟବସାୟ ମୂଲ୍ୟାଙ୍କନ ଆରମ୍ଭ କରନ୍ତୁ",
    exploreFeatures: "ବୈଶିଷ୍ଟ୍ୟ ଦେଖନ୍ତୁ",
    simpleToUse: "ବ୍ୟବହାର କରିବା ସହଜ",
    localInsights: "ସ୍ଥାନୀୟ ସୂଚନା",
    smartFinancialPlanning: "ସ୍ମାର୍ଟ ଆର୍ଥିକ ଯୋଜନା",
    aiBusinessAdvisor: "AI ବ୍ୟବସାୟ ପରାମର୍ଶଦାତା",
    online: "ଅନଲାଇନ",
    namaste: "ନମସ୍କାର!",
    askGramSaarthi: "GramSaarthi କୁ ପଚାରନ୍ତୁ...",
    whatWeOffer: "ଆମେ କଣ ଦେଉଛୁ",
    everythingBeforeInvest: "ନିବେଶ ପୂର୍ବରୁ ଆପଣଙ୍କୁ ଆବଶ୍ୟକ ସବୁକିଛି।",
    aiBusinessMatching: "AI ବ୍ୟବସାୟ ମେଳ",
    aiBusinessMatchingDesc:
      "ଆପଣଙ୍କ ପୁଞ୍ଜି, ଦକ୍ଷତା, ସମ୍ବଳ ଏବଂ ସ୍ଥାନୀୟ ସୁଯୋଗ ସହିତ ମେଳ ଖାଉଥିବା ବ୍ୟବସାୟ ଖୋଜନ୍ତୁ।",
    localMarketAnalysis: "ସ୍ଥାନୀୟ ବଜାର ବିଶ୍ଳେଷଣ",
    localMarketAnalysisDesc:
      "ଆପଣଙ୍କ ଗାଁ ଚାରିପାଖରେ ଥିବା ଚାହିଦା, ପ୍ରତିଯୋଗିତା ଏବଂ ବଜାର ସୁଯୋଗ ବୁଝନ୍ତୁ।",
    businessSimulatorDesc:
      "ଟଙ୍କା ନିବେଶ କରିବା ପୂର୍ବରୁ ଭିନ୍ନ ମୂଲ୍ୟ, ଗ୍ରାହକ ଏବଂ ଖର୍ଚ୍ଚ ପରୀକ୍ଷା କରନ୍ତୁ।",
    smartFinancialPlanningDesc:
      "ଆପଣଙ୍କ ପ୍ରକଳ୍ପ ଖର୍ଚ୍ଚ, ସମ୍ଭାବ୍ୟ ଅର୍ଥ ଏବଂ ପରିଶୋଧ ଯୋଜନା ବୁଝନ୍ତୁ।",
    howItWorksTitle: "ଏହା କିପରି କାମ କରେ",
    fourSteps: "ଧାରଣାରୁ କାର୍ଯ୍ୟ ପର୍ଯ୍ୟନ୍ତ 4ଟି ସରଳ ପଦକ୍ଷେପ।",
    tellUsAboutYou: "ଆପଣଙ୍କ ବିଷୟରେ କୁହନ୍ତୁ",
    tellUsAboutYouDesc:
      "ଆପଣଙ୍କ ସ୍ଥାନ, ପୁଞ୍ଜି, ଦକ୍ଷତା ଏବଂ ସମ୍ବଳ ସେୟାର କରନ୍ତୁ।",
    discoverOpportunities: "ସୁଯୋଗ ଖୋଜନ୍ତୁ",
    discoverOpportunitiesDesc:
      "ଆମର ସିଷ୍ଟମ ଉପଯୁକ୍ତ ସ୍ଥାନୀୟ ବ୍ୟବସାୟ ସୁଯୋଗ ବିଶ୍ଳେଷଣ କରେ।",
    testYourIdea: "ଆପଣଙ୍କ ଧାରଣା ପରୀକ୍ଷା କରନ୍ତୁ",
    testYourIdeaDesc:
      "ଲାଭ, ବିପଦ ଏବଂ ବିଭିନ୍ନ ବ୍ୟବସାୟ ପରିସ୍ଥିତିର ସିମୁଲେସନ କରନ୍ତୁ।",
    planWithConfidence: "ଆତ୍ମବିଶ୍ୱାସ ସହ ଯୋଜନା କରନ୍ତୁ",
    planWithConfidenceDesc:
      "ଆପଣଙ୍କ ବ୍ୟକ୍ତିଗତ ବ୍ୟବସାୟ ଏବଂ ଆର୍ଥିକ ରୋଡମ୍ୟାପ ପାଆନ୍ତୁ।",
    footerText:
      "ଗ୍ରାମୀଣ ସ୍ତରରେ ସ୍ମାର୍ଟ ଉଦ୍ୟୋଗୀତାକୁ ସଶକ୍ତ କରିବା।",

    dairyBusiness: "ଡେୟରୀ ବ୍ୟବସାୟ",
    groceryStore: "କିରାଣା ଦୋକାନ",
    tailoringBusiness: "ସିଲେଇ ବ୍ୟବସାୟ",
    poultryBusiness: "ପୋଲ୍ଟ୍ରି ବ୍ୟବସାୟ",
    foodProcessing: "ଖାଦ୍ୟ ପ୍ରକ୍ରିୟାକରଣ",
    smallGroceryStore: "ଛୋଟ କିରାଣା ଦୋକାନ",
    dairyReason:
      "ସ୍ଥାନୀୟ ଚାହିଦା ଏବଂ ସମ୍ବଳ ଉପଲବ୍ଧ ଥିଲେ ଡେୟରୀରେ ଭଲ ସମ୍ଭାବନା ଅଛି।",
    groceryReason:
      "କିରାଣା ବ୍ୟବସାୟ ସ୍ଥାନୀୟ ପରିବାରମାନଙ୍କ ନିୟମିତ ଚାହିଦାରୁ ଲାଭ ପାଇପାରେ।",
    tailoringReason:
      "ସିଲେଇ ବ୍ୟବସାୟ ଅପେକ୍ଷାକୃତ କମ୍ ପ୍ରାରମ୍ଭିକ ନିବେଶ ଏବଂ ଦକ୍ଷତା ଆଧାରିତ କାମରେ ଆରମ୍ଭ କରାଯାଇପାରେ।",
    poultryReason:
      "ପୋଲ୍ଟ୍ରିରେ ଭଲ ସ୍ଥାନୀୟ ଚାହିଦା ଥାଇପାରେ, କିନ୍ତୁ ଖର୍ଚ୍ଚ ଏବଂ ସ୍ୱାସ୍ଥ୍ୟର ଯତ୍ନ ଆବଶ୍ୟକ।",
    foodProcessingReason:
      "ସ୍ଥାନୀୟ ଖାଦ୍ୟ ପ୍ରକ୍ରିୟାକରଣ କୃଷି ଉତ୍ପାଦର ମୂଲ୍ୟ ବଢ଼ାଇପାରେ ଏବଂ ନିକଟ ବଜାରକୁ ସେବା ଦେଇପାରେ।",
    smallGroceryReason:
      "ଛୋଟ କିରାଣା ଦୋକାନ ସ୍ଥାନୀୟ ସମୁଦାୟର ଦୈନନ୍ଦିନ ଆବଶ୍ୟକତା ପୂରଣ କରିପାରେ।",
    microFinance: "ମାଇକ୍ରୋ ଫାଇନାନ୍ସ",
    termLoan: "ଟର୍ମ ଲୋନ",
    aiAnalysisFailed: "AI ବିଶ୍ଳେଷଣ ବିଫଳ ହେଲା। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
    backendError:
      "GramSaarthi AI ସହିତ ସଂଯୋଗ ହୋଇପାରିଲା ନାହିଁ। backend ଚାଲୁ ଅଛି କି ନିଶ୍ଚିତ କରନ୍ତୁ।",
    aiReportError:
      "AI ରିପୋର୍ଟ ପ୍ରଦର୍ଶିତ ହୋଇପାରିଲା ନାହିଁ। ଦୟାକରି ପୁଣି ବିଶ୍ଳେଷଣ କରନ୍ତୁ।",
  },
};
// Ensure every language has the same keys as English (fallback)
Object.keys(translations).forEach((lang) => {
  if (lang === "English") return;
  const base = translations.English || {};
  const target = translations[lang] || {};
  Object.keys(base).forEach((k) => {
    if (!(k in target)) {
      target[k] = base[k];
    }
  });
  translations[lang] = target;
});

/* =========================================================
   BUSINESS OPTIONS
========================================================= */

const businessOptions = [
  ["Dairy", "dairyBusiness"],
  ["Grocery", "groceryStore"],
  ["Tailoring", "tailoringBusiness"],
  ["Poultry", "poultryBusiness"],
  ["Food Processing", "foodProcessing"],
];
/* =========================================================
   APP
========================================================= */
function App() {
  const [page, setPage] = React.useState("home");
  const [aiResult, setAiResult] = React.useState("");

  const [formData, setFormData] = React.useState({
    location: "",
    capital: "",
    skills: "",
    resources: "",
    language: "English",
    business: "Suggest a business for me",
  });
  const [bankReadyReport, setBankReadyReport] = React.useState(null);
  const [pdfReport, setPdfReport] = React.useState(null);
  const [isListening, setIsListening] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [voiceText, setVoiceText] = React.useState("");

const startVoiceInput = () => {
  console.log("VOICE BUTTON CLICKED");
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice input is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang =
    formData.language === "Gujarati"
      ? "gu-IN"
      : formData.language === "Hindi"
      ? "hi-IN"
      : formData.language === "Marathi"
      ? "mr-IN"
      : formData.language === "Punjabi"
      ? "pa-IN"
      : formData.language === "Bengali"
      ? "bn-IN"
      : formData.language === "Tamil"
      ? "ta-IN"
      : formData.language === "Telugu"
      ? "te-IN"
      : formData.language === "Kannada"
      ? "kn-IN"
      : formData.language === "Malayalam"
      ? "ml-IN"
      : formData.language === "Odia"
      ? "or-IN"
      : "en-IN";

  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;

    setVoiceText(text);
    mapVoiceToForm(text);
  };

  recognition.onerror = (event) => {
    console.error("Voice input error:", event.error);
    setIsListening(false);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognition.start();
};

   const mapVoiceToForm = (text) => {
  if (!text || !text.trim()) return;

  const lowerText = text.toLowerCase().trim();
  const updatedData = { ...formData };

  // =========================================================
  // 🌐 LANGUAGE DETECTION
  // =========================================================

  const gujaratiPattern = /[\u0A80-\u0AFF]/;
  const hindiPattern = /[\u0900-\u097F]/;

  let detectedLanguage = formData.language || "English";

  if (gujaratiPattern.test(text)) {
    detectedLanguage = "Gujarati";
  } else if (hindiPattern.test(text)) {
    detectedLanguage = "Hindi";
  } else {
    detectedLanguage = "English";
  }

  updatedData.language = detectedLanguage;

  // =========================================================
  // 💰 CAPITAL EXTRACTION
  // =========================================================

  const moneyMatch = lowerText.match(
    /(?:₹|rs\.?|rupees?|inr)?\s*([\d,]+(?:\.\d+)?)\s*(thousand|k|lakh|lakhs|crore|crores|rupees?|rs\.?|₹)?/i
  );

  if (moneyMatch) {
    let amount = parseFloat(
      moneyMatch[1].replace(/,/g, "")
    );

    const unit = moneyMatch[2]?.toLowerCase() || "";

    if (unit === "thousand" || unit === "k") {
      amount *= 1000;
    } else if (
      unit === "lakh" ||
      unit === "lakhs"
    ) {
      amount *= 100000;
    } else if (
      unit === "crore" ||
      unit === "crores"
    ) {
      amount *= 10000000;
    }

    updatedData.capital = Math.round(amount).toString();
  }

  // =========================================================
  // 📍 LOCATION EXTRACTION
  // =========================================================

  const locationPatterns = [
    /(?:live in|from|near|at|location is|village is)\s+([a-zA-Z\s]+?)(?:,|\.| and |$)/i,

    /(?:રહું છું|ગામ છે|ગામમાં|સ્થળ છે)\s+([\u0A80-\u0AFF\s]+?)(?:,|\.| અને |$)/i,

    /(?:रहता हूँ|रहती हूँ|गांव है|गाँव है|स्थान है)\s+([\u0900-\u097F\s]+?)(?:,|।| और |$)/i
  ];

  for (const pattern of locationPatterns) {
    const match = text.match(pattern);

    if (match && match[1]) {
      updatedData.location = match[1].trim();
      break;
    }
  }

  // =========================================================
  // 🛠️ SKILLS
  // =========================================================

  const skillMap = {
    farming: "Farming",
    "dairy farming": "Dairy Farming",
    tailoring: "Tailoring",
    cooking: "Cooking",
    carpentry: "Carpentry",
    handicraft: "Handicraft",
    weaving: "Weaving",
    poultry: "Poultry",
    gardening: "Gardening",
    teaching: "Teaching",
    driving: "Driving",
    repair: "Repair",

    "खेती": "Farming",
    "कृषि": "Farming",
    "सिलाई": "Tailoring",
    "खाना बनाना": "Cooking",
    "बढ़ई": "Carpentry",

    "ખેતી": "Farming",
    "સિલાઈ": "Tailoring",
    "રસોઈ": "Cooking",
    "કારીગરી": "Handicraft"
  };

  const foundSkills = Object.keys(skillMap)
    .filter((keyword) =>
      lowerText.includes(keyword.toLowerCase())
    )
    .map((keyword) => skillMap[keyword]);

  if (foundSkills.length > 0) {
    updatedData.skills = [
      ...new Set(foundSkills)
    ].join(", ");
  }

  // =========================================================
  // 📦 RESOURCES
  // =========================================================

  const resourceMap = {
    land: "Land",
    farm: "Farm",
    cow: "Cow",
    cows: "Cows",
    buffalo: "Buffalo",
    water: "Water",
    tractor: "Tractor",
    shop: "Shop",
    vehicle: "Vehicle",
    "sewing machine": "Sewing Machine",
    tools: "Tools",
    livestock: "Livestock",

    "जमीन": "Land",
    "खेत": "Farm",
    "गाय": "Cow",
    "भैंस": "Buffalo",
    "ट्रैक्टर": "Tractor",
    "दुकान": "Shop",

    "જમીન": "Land",
    "ખેતર": "Farm",
    "ગાય": "Cow",
    "ભેંસ": "Buffalo",
    "ટ્રેક્ટર": "Tractor",
    "દુકાન": "Shop"
  };

  const foundResources = Object.keys(resourceMap)
    .filter((keyword) =>
      lowerText.includes(keyword.toLowerCase())
    )
    .map((keyword) => resourceMap[keyword]);

  if (foundResources.length > 0) {
    updatedData.resources = [
      ...new Set(foundResources)
    ].join(", ");
  }

  // =========================================================
  // 🏪 BUSINESS
  // =========================================================

  const businessMap = {
    dairy: "Dairy",
    poultry: "Poultry",
    tailoring: "Tailoring",
    farming: "Organic Farming",
    bakery: "Food Processing",
    catering: "Cooking / Catering",
    handicraft: "Handicrafts",
    vegetable: "Organic Farming",
    organic: "Organic Farming",
    vermicompost: "Vermicompost / Organic Inputs",
    grocery: "Grocery",

    "डेयरी": "Dairy",
    "दूध": "Dairy",
    "पोल्ट्री": "Poultry",
    "सिलाई": "Tailoring",
    "खेती": "Organic Farming",
    "बेकरी": "Food Processing",
    "किराना": "Grocery",

    "ડેરી": "Dairy",
    "દૂધ": "Dairy",
    "પોલ્ટ્રી": "Poultry",
    "સિલાઈ": "Tailoring",
    "ખેતી": "Organic Farming",
    "બેકરી": "Food Processing",
    "કિરાણા": "Grocery"
  };

  const foundBusiness = Object.keys(businessMap).find(
    (keyword) =>
      lowerText.includes(keyword.toLowerCase())
  );

  if (foundBusiness) {
    updatedData.business =
      businessMap[foundBusiness];
  }

  // =========================================================
  // 📊 NLP PROFILE
  // =========================================================

  updatedData.voiceInput = text;

  console.log("🧠 NLP PROFILE:", {
    language: updatedData.language,
    location: updatedData.location,
    capital: updatedData.capital,
    business: updatedData.business,
    skills: updatedData.skills,
    resources: updatedData.resources
  });

  setFormData(updatedData);
};

  const t =
    translations[formData.language] || translations.English;

  // safe translation getter: prefers selected language, falls back to English
  const tr = (key) => (t && t[key]) || translations.English[key] || key;

  const [simulator, setSimulator] = React.useState({
    investment: 50000,
    customers: 15,
    price: 200,
    expenses: 30000,
  });

  /* =========================================================
   RECOMMENDATION LOGIC
========================================================= */
  const getRecommendation = () => {
    const location = formData.location.toLowerCase();

let locationType = "rural";
let locationDemand = 80;
let locationReason = "The selected location has potential for local business activity.";

if (
  location.includes("city") ||
  location.includes("urban") ||
  location.includes("vadodara") ||
  location.includes("ahmedabad") ||
  location.includes("surat")
) {
  locationType = "urban";
  locationDemand = 88;
  locationReason =
    "The location is connected to an urban market with access to more customers.";
}

if (
  location.includes("village") ||
  location.includes("gaon") ||
  location.includes("gram")
) {
  locationType = "village";
  locationDemand = 84;
  locationReason =
    "The location can support businesses serving nearby village households and local markets.";
}
    const capital = Number(formData.capital) || 0;
    const business = formData.business;

    if (business === "Dairy") {
      return {
        name: "Dairy Business",
        score: Math.min(
          95,
          70 + (capital >= 50000 ? 15 : 5)
        ),
        demand: 91,
        capitalFit: capital >= 50000 ? 88 : 68,
        resourceFit: formData.resources ? 92 : 72,
        risk: "Medium",
        reason:
          "Dairy has strong potential when local demand and resources are available.",
      };
    }

    if (business === "Grocery") {
      return {
        name: "Grocery Store",
        score: Math.min(
          93,
          68 + (capital >= 100000 ? 18 : 8)
        ),
        demand: 84,
        capitalFit: capital >= 100000 ? 90 : 70,
        resourceFit: formData.resources ? 85 : 70,
        risk: "Medium",
        reason:
          "A grocery business can benefit from regular local household demand.",
      };
    }

    if (business === "Tailoring") {
      return {
        name: "Tailoring Business",
        score: Math.min(
          94,
          72 + (formData.skills ? 18 : 5)
        ),
        demand: 79,
        capitalFit: capital >= 30000 ? 91 : 70,
        resourceFit: formData.resources ? 88 : 72,
        risk: "Low",
        reason:
          "Tailoring can be started with relatively lower initial investment and skill-based work.",
      };
    }

    if (business === "Poultry") {
      return {
        name: "Poultry Business",
        score: Math.min(
          92,
          67 + (capital >= 75000 ? 18 : 6)
        ),
        demand: 86,
        capitalFit: capital >= 75000 ? 87 : 65,
        resourceFit: formData.resources ? 89 : 70,
        risk: "Medium",
        reason:
          "Poultry can offer good local demand but requires careful cost and health management.",
      };
    }

    if (business === "Food Processing") {
      return {
        name: "Food Processing",
        score: Math.min(
          91,
          69 + (capital >= 100000 ? 17 : 7)
        ),
        demand: 82,
        capitalFit: capital >= 100000 ? 88 : 67,
        resourceFit: formData.resources ? 90 : 70,
        risk: "Medium",
        reason:
          "Local food processing can create value from agricultural products and serve nearby markets.",
      };
    }

   if (capital >= 100000) {
  return {
    name: "Dairy Business",
    score: Math.min(95, 87 + Math.round((locationDemand - 80) / 4)),
    demand: locationDemand,
    capitalFit: 88,
    resourceFit: 86,
    risk: "Medium",
    reason:
      "Dairy is a strong starting opportunity based on your available capital, local demand, and location.",
    locationType: locationType,
    locationReason: locationReason,
  };
}

    if (
      formData.skills
        .toLowerCase()
        .includes("tailor")
    ) {
    return {
  name: "Tailoring Business",
  score: Math.min(95, 89 + Math.round((locationDemand - 80) / 4)),
  demand: locationDemand,
  capitalFit: 92,
  resourceFit: 88,
  risk: "Low",
  reason:
    "Your existing tailoring skills make this a strong business match for the selected location.",
  locationType: locationType,
  locationReason: locationReason,
};
    }

    return {
  name: "Small Grocery Store",
  score: Math.min(95, 82 + Math.round((locationDemand - 80) / 4)),
  demand: locationDemand,
  capitalFit: 85,
  resourceFit: 80,
  risk: "Low",
  reason:
    "A grocery store can serve regular household needs in the selected location.",
  locationType: locationType,
  locationReason: locationReason,
};
  };

  const recommendation = getRecommendation();

 /* =========================================================
   TRANSLATION HELPERS
========================================================= */

  const translateRisk = (risk) => {
    const map = {
      Low: t.low,
      Medium: t.medium,
      High: t.high,
    };

    return map[risk] || risk;
  };

  const translatedRecommendation = (() => {
    const map = {
      "Dairy Business": {
        name: t.dairyBusiness,
        reason: t.dairyReason,
      },
      "Grocery Store": {
        name: t.groceryStore,
        reason: t.groceryReason,
      },
      "Tailoring Business": {
        name: t.tailoringBusiness,
        reason: t.tailoringReason,
      },
      "Poultry Business": {
        name: t.poultryBusiness,
        reason: t.poultryReason,
      },
      "Food Processing": {
        name: t.foodProcessing,
        reason: t.foodProcessingReason,
      },
      "Small Grocery Store": {
        name: t.smallGroceryStore,
        reason: t.smallGroceryReason,
      },
    };

    return (
      map[recommendation.name] || {
        name: recommendation.name,
        reason: recommendation.reason,
      }
    );
  })();

  const getAiGuidanceText = () => {
    if (!aiResult) return "";

    try {
      const report =
        typeof aiResult === "string"
          ? JSON.parse(aiResult)
          : aiResult;

      const summaryParts = [
        report?.marketReach?.summary,
        report?.opportunity?.summary,
        report?.recommendation?.reason,
        report?.recommendation?.verdict,
      ].filter(Boolean);

      return summaryParts.join(". ");
    } catch (error) {
      console.error("AI guidance parse error:", error);
      return "";
    }
  };

  const downloadPdfReport = () => {
    if (!pdfReport?.available || !pdfReport?.data) {
      return;
    }

    try {
      const rawPdfData = pdfReport.data.includes("base64,")
        ? pdfReport.data.split("base64,")[1]
        : pdfReport.data;

      const binary = atob(rawPdfData);
      const bytes = Uint8Array.from(binary, (char) =>
        char.charCodeAt(0)
      );
      const blob = new Blob([bytes], {
        type: pdfReport.mimeType || "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download =
        pdfReport.fileName || "GramSaarthi-Business-Report.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (error) {
      console.error("PDF download error:", error);
      alert(t.aiReportError || t.backendError);
    }
  };

  const speakText = React.useCallback(
    async (text) => {
      if (!text || !text.trim()) return;

      if (!window.Audio) {
        alert(t.audioNotSupported);
        return;
      }

      setIsSpeaking(true);

      try {
        const response = await fetch("/api/voice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            language: formData.language || "English",
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success || !data.audio) {
          throw new Error(
            data?.message ||
              data?.error ||
              t.audioError ||
              "Unable to generate audio."
          );
        }

        const rawAudio = data.audio.includes("base64,")
          ? data.audio.split("base64,")[1]
          : data.audio;
        const binary = atob(rawAudio);
        const bytes = Uint8Array.from(binary, (char) =>
          char.charCodeAt(0)
        );
        const blob = new Blob([bytes], {
          type: data.mimeType || "audio/wav",
        });
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);

        audio.onended = () => URL.revokeObjectURL(audioUrl);
        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          alert(t.audioError);
        };

        await audio.play();
      } catch (error) {
        console.error("Voice output error:", error);
        alert(t.audioError);
      } finally {
        setIsSpeaking(false);
      }
    },
    [formData.language, t.audioError, t.audioNotSupported]
  );

  /* =========================================================
     RESULTS PAGE
  ========================================================= */

  if (page === "results") {
    return (
      <div className="assessment-page">
        <div className="assessment-header">
          <div className="logo">
            <span>🌱</span> GramSaarthi AI
          </div>

          <span className="step-text">
            {t.assessmentComplete}
          </span>
        </div>

        <div className="assessment-container">
          <div className="assessment-intro">
            <p className="small-label">
              {t.businessMatch}
            </p>

            <h1>{t.found}</h1>

            <p>{t.matchDesc}</p>
          </div>

          <div className="form-card">
            
            <div className="result-business">
              <div>
                <span className="result-rank">
                  {t.recommended}
                </span>

                <h2>
                  {translatedRecommendation.name}
                </h2>

                <p>
                  {translatedRecommendation.reason}
                </p>
              </div>

              <div className="score">
                <strong>
                  {recommendation.score}
                </strong>

                <span>/100</span>

                <small>{t.matchScore}</small>
              </div>
            </div>

            <button
              type="button"
              className="continue-btn"
              onClick={() =>
                speakText(translatedRecommendation.reason)
              }
            >
              {isSpeaking ? t.audioLoading : `🔊 ${t.listen}`}
            </button>

            {aiResult && (
              <div className="ai-report-card">
                <div className="ai-report-header">
                  <span>✦</span>

                  <div>
                    <p className="small-label">
                      GRAMSAARTHI AI
                    </p>

                    <h2>{t.aiBusinessAdvisor}</h2>
                  </div>
                </div>

                <button
                  type="button"
                  className="continue-btn"
                  onClick={() => speakText(getAiGuidanceText())}
                >
                  {isSpeaking ? t.audioLoading : `🔊 ${t.listen}`}
                </button>

                <div className="ai-report-text">
                  {(() => {
                    try {
                      const report =
                        typeof aiResult === "string"
                          ? JSON.parse(aiResult)
                          : aiResult;

                      return (
                        <>
                          <div className="ai-section-card">
                            <h3>
                              📍 {t.marketReach}
                            </h3>

                            <p>
                              {
                                report.marketReach
                                  ?.summary
                              }
                            </p>

                            <h4>
                              {t.primaryCustomers}
                            </h4>

                            <p>
                              {
                                report.marketReach
                                  ?.primaryCustomers
                              }
                            </p>

                            <h4>
                              {t.distributionChannels}
                            </h4>

                            <p>
                              {
                                report.marketReach
                                  ?.distributionChannels
                              }
                            </p>
                          </div>

                          <div className="ai-section-card">
                            <h3>
                              💡 {t.opportunity}
                            </h3>

                            <p>
                              {
                                report.opportunity
                                  ?.summary
                              }
                            </p>

                            <ul>
                              {report.opportunity?.underservedNeeds?.map(
                                (item, index) => (
                                  <li key={index}>
                                    {item}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>

                          <div className="ai-section-card">
                            <h3>
                              📊 {t.swot}
                            </h3>

                            <div className="swot-grid">
                              <div>
                                <h4>
                                  {t.strengths}
                                </h4>

                                <ul>
                                  {report.swot?.strengths?.map(
                                    (item, index) => (
                                      <li key={index}>
                                        {item}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>

                              <div>
                                <h4>
                                  {t.weaknesses}
                                </h4>

                                <ul>
                                  {report.swot?.weaknesses?.map(
                                    (item, index) => (
                                      <li key={index}>
                                        {item}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>

                              <div>
                                <h4>
                                  {t.opportunities}
                                </h4>

                                <ul>
                                  {report.swot?.opportunities?.map(
                                    (item, index) => (
                                      <li key={index}>
                                        {item}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>

                              <div>
                                <h4>
                                  {t.threats}
                                </h4>

                                <ul>
                                  {report.swot?.threats?.map(
                                    (item, index) => (
                                      <li key={index}>
                                        {item}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="ai-section-card">
                            <h3>
                              ⚠️ {t.localThreats}
                            </h3>

                            <ul>
                              {report.localThreats?.map(
                                (item, index) => (
                                  <li key={index}>
                                    {item}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>

                          <div className="ai-section-card">
                            <h3>
                              🏪 {t.competitors}
                            </h3>

                            <p>
                              {
                                report.competitors
                                  ?.summary
                              }
                            </p>

                            <h4>
                              {t.mainCompetitors}
                            </h4>

                            <ul>
                              {report.competitors?.mainCompetitors?.map(
                                (item, index) => (
                                  <li key={index}>
                                    {item}
                                  </li>
                                )
                              )}
                            </ul>

                            <h4>
                              {t.competitiveAdvantage}
                            </h4>

                            <p>
                              {
                                report.competitors
                                  ?.competitiveAdvantage
                              }
                            </p>
                          </div>

                          <div className="ai-section-card">
                            <h3>
                              💰 {t.pricing}
                            </h3>

                            <p>
                              <strong>
                                {t.strategy}
                              </strong>{" "}
                              {
                                report.pricing
                                  ?.strategy
                              }
                            </p>

                            <p>
                              <strong>
                                {t.suggestedPricing}
                              </strong>{" "}
                              {
                                report.pricing
                                  ?.suggestion
                              }
                            </p>

                            <p>
                              <strong>
                                {t.why}
                              </strong>{" "}
                              {
                                report.pricing
                                  ?.reason
                              }
                            </p>
                          </div>

                          <div className="ai-section-card recommendation-card">
                            <h3>
                              🌱 {t.recommendation}
                            </h3>

                            <h4>
                              {
                                report
                                  .recommendation
                                  ?.verdict
                              }
                            </h4>

                            <p>
                              {
                                report
                                  .recommendation
                                  ?.reason
                              }
                            </p>

                            <h4>
                              {t.recommendedSteps}
                            </h4>

                            <ol>
                              {report.recommendation?.steps?.map(
                                (step, index) => (
                                  <li key={index}>
                                    {step}
                                  </li>
                                )
                              )}
                            </ol>
                          </div>
                        </>
                      );
                    } catch (error) {
                      console.error(
                        "AI report parse error:",
                        error
                      );

                      return (
                        <p>
                          {t.aiReportError}
                        </p>
                      );
                    }
                  })()}
                </div>
              </div>
            )}

            {/* Final Recommendation — concise summary from backend result */}
            {aiResult && (
              (() => {
                try {
                  const report =
                    typeof aiResult === "string"
                      ? JSON.parse(aiResult)
                      : aiResult;

                  const verdict =
                    report?.recommendation?.verdict || report?.decision || "";
                  const isRec = /recommend/i.test(verdict || "");

                  const recommendedBusiness =
                    report?.recommendation?.business ||
                    report?.recommendation?.name ||
                    formData.business ||
                    t.notSpecified;

                  const why =
                    report?.recommendation?.reason || report?.opportunity?.summary ||
                    t.notSpecified;

                  const financial = report?.financials || report?.financialOutcome || {};
                  const requiredInvestment =
                    financial?.requiredInvestment ||
                    financial?.investmentRequired ||
                    formData.capital ||
                    t.notSpecified;

                  const expectedProfit =
                    financial?.expectedProfit || financial?.expectedRevenue || t.notSpecified;

                  const risks =
                    report?.risks?.summary || report?.mainRisks || report?.risk || t.notSpecified;

                  const marketInsight = report?.marketReach?.summary || t.notSpecified;

                  const steps = report?.recommendation?.steps || [];

                  // Build a safe action plan from available AI / report fields
                  const actionSource =
                    report?.actionPlan || report?.plan || report?.roadmap || report?.recommendation?.steps || report?.nextSteps || bankReadyReport?.actionPlan || bankReadyReport?.roadmap || [];

                  const planArray = Array.isArray(actionSource)
                    ? actionSource
                    : typeof actionSource === "string"
                    ? [actionSource]
                    : [];

                  const immediatePlan = planArray.slice(0, 2);
                  const preparationPlan = planArray.slice(2, 4);
                  const launchPlan = planArray.slice(4, 6);
                  const monitorPlan = planArray.slice(6, 10);

                  const hasPlan = planArray.length > 0;

                  const planSummaryText = (() => {
                    try {
                      const parts = [];
                      parts.push(`${tr("actionPlanTitle")} - ${recommendedBusiness}`);
                      if (hasPlan) {
                        planArray.slice(0, 6).forEach((s, i) => {
                          parts.push(`${i + 1}. ${s}`);
                        });
                      } else {
                        parts.push(tr("actionPlanNoData"));
                        parts.push(tr("validateDemand"));
                        parts.push(tr("smallPilot"));
                        parts.push(tr("trackNumbers"));
                        parts.push(tr("planFinances"));
                      }

                      parts.push(`Location: ${formData.location || tr("notSpecified")}`);
                      parts.push(`Capital: ${formData.capital || tr("notSpecified")}`);
                      parts.push(`Skills: ${formData.skills || tr("notSpecified")}`);
                      parts.push(`Resources: ${formData.resources || tr("notSpecified")}`);

                      return parts.join(". ");
                    } catch (e) {
                      return "";
                    }
                  })();

                  // Build government / funding guidance from AI result or fallback categories
                  const govSource =
                    report?.governmentSupport || report?.fundingSupport || report?.fundingOptions || report?.supportOptions || report?.schemes || report?.governmentSchemes || report?.financing || report?.funding || bankReadyReport?.funding || bankReadyReport?.governmentSupport || null;

                  let govItems = [];
                  if (Array.isArray(govSource) && govSource.length) {
                    govItems = govSource.map((g) => (typeof g === "string" ? g : JSON.stringify(g)));
                  } else if (typeof govSource === "string") {
                    govItems = [govSource];
                  }

                  // Conservative fallback categories based on business type
                  const businessLower = (formData.business || "").toLowerCase();
                  const fallbackCategories = [];

                  if (/farm|dairy|agri|farming|vegetable|organic|poultry|cattle|livestock/.test(businessLower)) {
                    fallbackCategories.push(tr("supportAgriculture"));
                    fallbackCategories.push(tr("supportEquipment"));
                    fallbackCategories.push(tr("supportFinancing"));
                    fallbackCategories.push(tr("supportTraining"));
                  } else if (/food|bakery|catering|processing|grocery|shop/.test(businessLower)) {
                    fallbackCategories.push(tr("supportFinancing"));
                    fallbackCategories.push(tr("supportTraining"));
                    fallbackCategories.push(tr("supportLocalBusiness"));
                    fallbackCategories.push(tr("supportMarketAccess"));
                  } else if (/handicraft|weaving|craft|artisan|carpentry|tailor|tailoring/.test(businessLower)) {
                    fallbackCategories.push(tr("supportTraining"));
                    fallbackCategories.push(tr("supportMarketAccess"));
                    fallbackCategories.push(tr("supportFinancing"));
                  } else {
                    fallbackCategories.push(tr("supportFinancing"));
                    fallbackCategories.push(tr("supportTraining"));
                    fallbackCategories.push(tr("supportLocalBusiness"));
                    fallbackCategories.push(tr("supportMarketAccess"));
                  }

                  const hasGov = govItems.length > 0;

                  const govSummaryText = (() => {
                    try {
                      const parts = [];
                      parts.push(tr("governmentSupportTitle"));
                      if (hasGov) {
                        govItems.slice(0, 6).forEach((g, i) => parts.push(`${i + 1}. ${g}`));
                      } else {
                        parts.push(tr("governmentSupportNoData"));
                        fallbackCategories.slice(0, 4).forEach((c, i) => parts.push(`${i + 1}. ${c}`));
                      }
                      parts.push(`Business: ${formData.business || tr("notSpecified")}`);
                      parts.push(`Location: ${formData.location || tr("notSpecified")}`);
                      return parts.join(". ");
                    } catch (e) {
                      return "";
                    }
                  })();

                  return (
                    <div className="final-recommendation-card">
                      <div className="final-header">
                        <h3>{t.finalRecommendationTitle}</h3>

                        <div
                          className={`decision-badge ${isRec ? "recommended" : "not-recommended"}`}
                        >
                          {isRec ? t.finalDecisionRecommended : t.finalDecisionNotRecommended}
                        </div>

                        {/* Government & Funding Guidance */}
                        <div className="government-support-card" style={{marginTop:12}}>
                          <h4>{tr("governmentSupportTitle")}</h4>
                          <p className="small-label">{tr("governmentSupportSubtitle")}</p>

                          {hasGov ? (
                            <div>
                              <p>
                                <strong>{tr("fundingCategory")}: </strong>
                              </p>
                              <ul>
                                {govItems.map((g, i) => (
                                  <li key={i}>
                                    <div><strong>{g}</strong></div>
                                    <div style={{fontSize:13, color:"#444"}}>
                                      {tr("supportWhyRelevant")}: {t.notSpecified}
                                    </div>
                                    <div style={{fontSize:13, color:"#666"}}>
                                      {tr("supportWhatToCheck")}: {tr("supportVerifyOfficial")}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <div>
                              <p>{tr("governmentSupportNoData")}</p>
                              <div>
                                <ul>
                                  {fallbackCategories.map((c, i) => (
                                    <li key={i}>
                                      <strong>{c}</strong>
                                      <div style={{fontSize:13, color:"#444"}}>
                                        {tr("supportWhyRelevant")} - {t.notSpecified}
                                      </div>
                                      <div style={{fontSize:13, color:"#666"}}>
                                        {tr("supportWhatToCheck")} - {tr("supportVerifyOfficial")}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          <p style={{fontSize:12, color:"#666", marginTop:8}}>
                            {tr("supportVerifyOfficial")}
                          </p>
                        </div>
                      </div>

                      <div className="final-body">
                        <p>
                          <strong>{t.recommended}: </strong>
                          {recommendedBusiness}
                        </p>

                        <p>
                          <strong>{t.why}: </strong>
                          {why}
                        </p>

                        <p>
                          <strong>{t.investment}: </strong>
                          {requiredInvestment}
                        </p>

                        <p>
                          <strong>{t.expectedProfit}: </strong>
                          {expectedProfit}
                        </p>

                        <p>
                          <strong>{t.mainRisks}: </strong>
                          {Array.isArray(risks) ? risks.join(", ") : risks}
                        </p>

                        <p>
                          <strong>{t.localMarketAnalysis}: </strong>
                          {marketInsight}
                        </p>

                        <div>
                          <strong>{t.nextSteps}: </strong>
                          {steps.length ? (
                            <ol>
                              {steps.map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ol>
                          ) : (
                            <span> {t.notSpecified} </span>
                          )}
                        </div>

                        {/* Personalized Action Plan */}
                        <div className="personal-action-plan-card" style={{marginTop:12}}>
                          <h4>{tr("actionPlanTitle")}</h4>

                          <p>
                            <strong>{tr("actionPlanBasedOn")}:</strong>
                          </p>

                          <ul>
                            <li>
                              {t.businessIdea}: {formData.business || t.notSpecified}
                            </li>
                            <li>
                              {t.location}: {formData.location || t.notSpecified}
                            </li>
                            <li>
                              {t.capital}: {formData.capital || t.notSpecified}
                            </li>
                            <li>
                              {t.skills}: {formData.skills || t.notSpecified}
                            </li>
                            <li>
                              {t.resources}: {formData.resources || t.notSpecified}
                            </li>
                          </ul>

                          {hasPlan ? (
                            <div>
                              {immediatePlan.length > 0 && (
                                <div>
                                  <strong>{tr("actionPlanImmediate")}:</strong>
                                  <ol>
                                    {immediatePlan.map((p, i) => (
                                      <li key={i}>{p}</li>
                                    ))}
                                  </ol>
                                </div>
                              )}

                              {preparationPlan.length > 0 && (
                                <div>
                                  <strong>{tr("actionPlanPreparation")}:</strong>
                                  <ol>
                                    {preparationPlan.map((p, i) => (
                                      <li key={i}>{p}</li>
                                    ))}
                                  </ol>
                                </div>
                              )}

                              {launchPlan.length > 0 && (
                                <div>
                                  <strong>{tr("actionPlanLaunch")}:</strong>
                                  <ol>
                                    {launchPlan.map((p, i) => (
                                      <li key={i}>{p}</li>
                                    ))}
                                  </ol>
                                </div>
                              )}

                              {monitorPlan.length > 0 && (
                                <div>
                                  <strong>{tr("actionPlanMonitor")}:</strong>
                                  <ol>
                                    {monitorPlan.map((p, i) => (
                                      <li key={i}>{p}</li>
                                    ))}
                                  </ol>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <p>{tr("actionPlanNoData")}</p>
                              <ul>
                                <li>{t.validateDemand}</li>
                                <li>{t.smallPilot}</li>
                                <li>{t.trackNumbers}</li>
                                <li>{t.planFinances}</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="final-actions">
                        <button
                          type="button"
                          className="continue-btn"
                          onClick={() => speakText(getAiGuidanceText())}
                        >
                          {isSpeaking ? t.audioLoading : `🔊 ${t.listen}`}
                        </button>

                        {pdfReport?.available && pdfReport?.data && (
                          <button className="continue-btn" onClick={downloadPdfReport}>
                            📄 {t.downloadCompleteReport}
                          </button>
                        )}

                        <button
                          type="button"
                          className="continue-btn"
                          onClick={() => speakText(planSummaryText)}
                        >
                          {isSpeaking ? t.audioLoading : `🔊 ${tr("actionPlanListen")}`}
                        </button>
                      </div>
                    </div>
                  );
                } catch (err) {
                  console.error("Final recommendation render error:", err);
                  return null;
                }
              })()
            )}

            <div className="score-grid">
              <div>
                <span>
                  {t.localDemand}
                </span>

                <strong>
                  {recommendation.demand}/100
                </strong>
              </div>

              <div>
                <span>
                  {t.capitalFit}
                </span>

                <strong>
                  {recommendation.capitalFit}/100
                </strong>
              </div>

              <div>
                <span>
                  {t.resourceFit}
                </span>

                <strong>
                  {recommendation.resourceFit}/100
                </strong>
              </div>

              <div>
                <span>{t.risk}</span>

                <strong>
                  {translateRisk(
                    recommendation.risk
                  )}
                </strong>
              </div>
            </div>

            <button
              className="continue-btn"
              onClick={() =>
                setPage("market")
              }
            >
              {t.exploreBusiness} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     MARKET PAGE
  ========================================================= */

  if (page === "market") {
    return (
      <div className="assessment-page">
        <div className="assessment-header">
          <div className="logo">
            <span>🌱</span> GramSaarthi AI
          </div>

          <span className="step-text">
            {t.marketAnalysis}
          </span>
        </div>

        <div className="assessment-container">
          <div className="assessment-intro">
            <p className="small-label">
              {t.hyperLocalMarket}
            </p>

            <h1>{t.understandMarket}</h1>

            <p>{t.marketDesc}</p>
          </div>

          <div className="market-grid">
            <div className="market-card">
              <div className="market-icon">
                📍
              </div>

              <span>{t.location}</span>

              <h3>
                {formData.location ||
                  t.yourVillage}
              </h3>

              <p>{t.localMarketArea}</p>
            </div>

            <div className="market-card">
              <div className="market-icon">
                👥
              </div>

              <span>
                {t.estimatedDemand}
              </span>

              <h3>{t.high}</h3>

              <div className="progress">
                <div className="progress-fill demand"></div>
              </div>
              <p>{recommendation.demand} / 100</p>
            </div>

            <div className="market-card">
              <div className="market-icon">
                🏪
              </div>

              <span>{t.competition}</span>

              <h3>{t.medium}</h3>

              <div className="progress">
                <div className="progress-fill competition"></div>
              </div>

              <p>52 / 100</p>
            </div>

            <div className="market-card">
              <div className="market-icon">
                📈
              </div>

              <span>
                {t.growthPotential}
              </span>

              <h3>{t.strong}</h3>

              <div className="progress">
                <div className="progress-fill growth"></div>
              </div>

              <p>84 / 100</p>
            </div>
          </div>

          <div className="market-section">
            <div className="market-section-title">
              <div>
                <p className="small-label">
                  {t.seasonalDemand}
                </p>

                <h2>
                  {t.whenDemandHighest}
                </h2>
              </div>

              <span className="demo-badge">
                {t.demoData}
              </span>
            </div>

            <div className="season-bars">
              {[
                [t.summer, "72%"],
                [t.monsoon, "61%"],
                [t.winter, "84%"],
                [t.festival, "92%"],
              ].map(
                ([label, width], index) => (
                  <div key={index}>
                    <span>{label}</span>

                    <div className="bar">
                      <div
                        style={{
                          width,
                        }}
                      ></div>
                    </div>

                    <strong>
                      {parseInt(width)}
                    </strong>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="market-section">
            <div className="market-section-title">
              <div>
                <p className="small-label">
                  {t.competitorMap}
                </p>

                <h2>
                  {t.nearbyBusinessActivity}
                </h2>
              </div>

              <span className="demo-badge">
                {t.illustrative}
              </span>
            </div>

            <div className="real-map-container">
  {formData.location ? (
    <iframe
      title="Business Location Map"
      src={`https://www.google.com/maps?q=${encodeURIComponent(
        formData.location
      )}&output=embed`}
      width="100%"
      height="350"
      style={{
        border: 0,
        borderRadius: "18px",
      }}
      loading="lazy"
    ></iframe>
  ) : (
    <div className="map-placeholder">
      📍 Location not provided
    </div>
  )}

  <div className="map-location-badge">
    📍 {formData.location || t.yourVillage}
  </div>
</div>
            </div>

            <p className="map-note">
              {t.mapNote}
            </p>
          </div>

          <button
            className="continue-btn"
            onClick={() =>
              setPage("risk")
            }
          >
            {t.analyzeRisks} →
          </button>
        </div>
          );
  }

  /* =========================================================
     RISK PAGE
  ========================================================= */

  if (page === "risk") {
    return (
      <div className="assessment-page">
        <div className="assessment-header">
          <div className="logo">
            <span>🌱</span> GramSaarthi AI
          </div>

          <span className="step-text">
            {t.riskAnalysis}
          </span>
        </div>

        <div className="assessment-container">
          <div className="assessment-intro">
            <p className="small-label">
              {t.aiRiskAnalysis}
            </p>

            <h1>{t.knowRisks}</h1>

            <p>{t.riskDesc}</p>
          </div>

          <div className="risk-overview">
            <div>
              <span>{t.overallRisk}</span>

              <h2>
                {translateRisk(
                  recommendation.risk
                )}
              </h2>

              <p>
                {t.manageablePlanning}
              </p>
            </div>

            <div className="risk-meter">
              <div className="risk-circle">
                <strong>
                  {recommendation.risk ===
                  "Low"
                    ? "28"
                    : "56"}
                </strong>

                <span>/100</span>
              </div>
            </div>
          </div>

          <div className="risk-list">
            <div className="risk-card">
              <div className="risk-card-icon">
                📊
              </div>

              <div>
                <span>{t.marketRisk}</span>

                <h3>
                  {t.changingDemand}
                </h3>

                <p>
                  {t.marketRiskDesc}
                </p>

                <strong className="risk-medium">
                  {t.medium}
                </strong>
              </div>
            </div>

            <div className="risk-card">
              <div className="risk-card-icon">
                💰
              </div>

              <div>
                <span>{t.financialRisk}</span>

                <h3>
                  {t.initialInvestment}
                </h3>

                <p>
                  {t.financialRiskDesc}
                </p>

                <strong className="risk-low">
                  {t.low}
                </strong>
              </div>
            </div>

            <div className="risk-card">
              <div className="risk-card-icon">
                🌦️
              </div>

              <div>
                <span>{t.seasonalRisk}</span>

                <h3>
                  {t.seasonDependentSales}
                </h3>

                <p>
                  {t.seasonalRiskDesc}
                </p>

                <strong className="risk-medium">
                  {t.medium}
                </strong>
              </div>
            </div>
          </div>

          <div className="swot-section">
            <div className="market-section-title">
              <div>
                <p className="small-label">
                  {t.aiSwot}
                </p>

                <h2>
                  {t.businessAtGlance}
                </h2>
              </div>
            </div>

            <div className="swot-grid">
              <div className="swot-card">
                <span>{t.strengths}</span>

                <ul>
                  <li>
                    {t.strongLocalDemand}
                  </li>

                  <li>
                    {t.repeatCustomers}
                  </li>

                  <li>
                    {t.manageableScale}
                  </li>
                </ul>
              </div>

              <div className="swot-card">
                <span>{t.weaknesses}</span>

                <ul>
                  <li>
                    {t.limitedResources}
                  </li>

                  <li>
                    {t.consistentQuality}
                  </li>

                  <li>
                    {t.limitedMarketReach}
                  </li>
                </ul>
              </div>

              <div className="swot-card">
                <span>
                  {t.opportunities}
                </span>

                <ul>
                  <li>
                    {t.growingLocalDemand}
                  </li>

                  <li>
                    {t.digitalMarketing}
                  </li>

                  <li>
                    {t.governmentSupport}
                  </li>
                </ul>
              </div>

              <div className="swot-card">
                <span>{t.threats}</span>

                <ul>
                  <li>
                    {t.newCompetitors}
                  </li>

                  <li>
                    {t.priceFluctuations}
                  </li>

                  <li>
                    {t.seasonalChanges}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <button
            className="continue-btn"
            onClick={() =>
              setPage("simulator")
            }
          >
            {t.trySimulator} →
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     SIMULATOR PAGE
  ========================================================= */

  if (page === "simulator") {
    const monthlyRevenue =
      simulator.customers *
      simulator.price *
      26;

    const monthlyProfit =
      monthlyRevenue -
      simulator.expenses;

    const yearlyProfit =
      monthlyProfit * 12;

    return (
      <div className="assessment-page">
        <div className="assessment-header">
          <div className="logo">
            <span>🌱</span> GramSaarthi AI
          </div>

          <span className="step-text">
            {t.businessSimulator}
          </span>
        </div>

        <div className="assessment-container">
          <div className="assessment-intro">
            <p className="small-label">
              {t.whatIfSimulator}
            </p>

            <h1>{t.testIdea}</h1>

            <p>{t.simulatorDesc}</p>
          </div>

          <div className="simulator-card">
            <div className="slider-group">
              <div className="slider-heading">
                <label>
                  💰 {t.initialInvestment}
                </label>

                <strong>
                  ₹
                  {simulator.investment.toLocaleString()}
                </strong>
              </div>

              <input
                type="range"
                min="10000"
                max="500000"
                step="10000"
                value={
                  simulator.investment
                }
                onChange={(e) =>
                  setSimulator({
                    ...simulator,
                    investment:
                      Number(
                        e.target.value
                      ),
                  })
                }
              />

              <div className="range-labels">
                <span>₹10K</span>
                <span>₹5L</span>
              </div>
            </div>

            <div className="slider-group">
              <div className="slider-heading">
                <label>
                  👥 {t.customersPerDay}
                </label>

                <strong>
                  {simulator.customers}
                </strong>
              </div>

              <input
                type="range"
                min="1"
                max="100"
                value={
                  simulator.customers
                }
                onChange={(e) =>
                  setSimulator({
                    ...simulator,
                    customers:
                      Number(
                        e.target.value
                      ),
                  })
                }
              />

              <div className="range-labels">
                <span>1</span>
                <span>100</span>
              </div>
            </div>

            <div className="slider-group">
              <div className="slider-heading">
                <label>
                  💵 {t.averagePrice}
                </label>

                <strong>
                  ₹{simulator.price}
                </strong>
              </div>

              <input
                type="range"
                min="20"
                max="2000"
                step="20"
                value={simulator.price}
                onChange={(e) =>
                  setSimulator({
                    ...simulator,
                    price:
                      Number(
                        e.target.value
                      ),
                  })
                }
              />

              <div className="range-labels">
                <span>₹20</span>
                <span>₹2,000</span>
              </div>
            </div>

            <div className="slider-group">
              <div className="slider-heading">
                <label>
                  📦 {t.monthlyExpenses}
                </label>

                <strong>
                  ₹
                  {simulator.expenses.toLocaleString()}
                </strong>
              </div>

              <input
                type="range"
                min="5000"
                max="200000"
                step="5000"
                value={
                  simulator.expenses
                }
                onChange={(e) =>
                  setSimulator({
                    ...simulator,
                    expenses:
                      Number(
                        e.target.value
                      ),
                  })
                }
              />

              <div className="range-labels">
                <span>₹5K</span>
                <span>₹2L</span>
              </div>
            </div>
          </div>

          <div className="simulation-results">
            <div className="simulation-result">
              <span>
                {t.monthlyRevenue}
              </span>

              <strong>
                ₹
                {monthlyRevenue.toLocaleString()}
              </strong>
            </div>

            <div className="simulation-result">
              <span>
                {t.monthlyProfit}
              </span>

              <strong>
                ₹
                {monthlyProfit.toLocaleString()}
              </strong>
            </div>

            <div className="simulation-result">
              <span>
                {t.yearlyProfit}
              </span>

              <strong>
                ₹
                {yearlyProfit.toLocaleString()}
              </strong>
            </div>
          </div>

          <div className="simulation-note">
            <strong>
              💡 {t.gramSaarthiInsight}
            </strong>

            <p>
              {t.simulatorNote}
            </p>
          </div>

          <button
            className="continue-btn"
            onClick={() =>
              setPage("finance")
            }
          >
            {t.planFinances} →
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     FINANCE PAGE
  ========================================================= */

  if (page === "finance") {
    const ownContribution =
      simulator.investment;

    const projectCost = Math.round(
      ownContribution / 0.1
    );

    const loanRequired = Math.max(
      0,
      projectCost - ownContribution
    );

    let schemeName;
    let annualInterest;
    let loanYears;
    let moratoriumMonths;

    if (projectCost < 140000) {
      schemeName = "Micro Finance";
      annualInterest = 6.5;
      loanYears = 3;
      moratoriumMonths = 3;
    } else {
      schemeName = "Term Loan";
      annualInterest = 8;
      loanYears = 7;
      moratoriumMonths = 6;
    }

    const months =
      loanYears * 12;

    const monthlyRate =
      annualInterest / 12 / 100;

    const emi =
      loanRequired === 0
        ? 0
        : (loanRequired *
            monthlyRate *
            Math.pow(
              1 + monthlyRate,
              months
            )) /
          (Math.pow(
            1 + monthlyRate,
            months
          ) - 1);

    const translatedSchemeName =
      schemeName === "Micro Finance"
        ? t.microFinance
        : t.termLoan;

    const downloadReport = async () => {
  try {
    const report = aiResult || {};

    const language = formData.language || "English";
    const isRTL = language === "Urdu";

    const esc = (value) => {
      if (value === null || value === undefined) return "";
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const list = (items) => {
      if (!Array.isArray(items) || items.length === 0) {
        return `<p style="margin:4px 0;">—</p>`;
      }

      return `
        <ul style="margin:6px 0 0 20px; padding:0;">
          ${items.map(item => `<li style="margin-bottom:5px;">${esc(item)}</li>`).join("")}
        </ul>
      `;
    };

    const section = (title, content) => `
      <section class="pdf-section">
        <h2>${esc(title)}</h2>
        ${content}
      </section>
    `;

    const html = `
      <div
        id="pdfReportContainer"
        style="
          width: 190mm;
          padding: 10mm;
          box-sizing: border-box;
          background: white;
          color: #17202a;
          font-family: Arial, 'Noto Sans', sans-serif;
          font-size: 11px;
          line-height: 1.55;
          direction: ${isRTL ? "rtl" : "ltr"};
          text-align: ${isRTL ? "right" : "left"};
        "
      >

        <!-- COVER -->
        <div
          style="
            min-height: 245mm;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            text-align:center;
            padding:20mm;
            box-sizing:border-box;
          "
        >
          <div style="font-size:38px; margin-bottom:12px;">🌾</div>

          <h1 style="
            font-size:30px;
            margin:0 0 8px;
            font-weight:700;
          ">
            GramSaarthi AI
          </h1>

          <h2 style="
            font-size:20px;
            margin:0 0 20px;
            font-weight:500;
          ">
            ${esc(t.aiBusinessAdvisory || "AI Business Advisory")}
          </h2>

          <div style="
            width:70%;
            border-top:2px solid #2f855a;
            margin:15px auto 25px;
          "></div>

          <p style="font-size:15px; margin:5px 0;">
            <strong>${esc(t.businessIdea || "Business Idea")}:</strong>
            ${esc(formData.business || formData.businessIdea || "—")}
          </p>

          <p style="font-size:15px; margin:5px 0;">
            <strong>${esc(t.location || "Location")}:</strong>
            ${esc(formData.location || "—")}
          </p>

          <p style="font-size:15px; margin:5px 0;">
            <strong>${esc(t.language || "Language")}:</strong>
            ${esc(language)}
          </p>

          <p style="
            margin-top:35px;
            font-size:12px;
            opacity:.7;
          ">
            ${esc(t.generatedByGramSaarthi || "Generated by GramSaarthi AI")}
          </p>
        </div>

        <!-- BUSINESS MATCH -->
        <div style="page-break-before:always;"></div>

        ${section(
          t.businessMatch || "Business Match",
          `
            <div class="info-box">
              <h3>${esc(formData.business || formData.businessIdea || "Business")}</h3>

              ${
                translatedRecommendation
                  ? `<p>${esc(translatedRecommendation)}</p>`
                  : ""
              }
            </div>
          `
        )}

        <!-- AI REPORT -->
        ${
          report.marketReach
            ? section(
                t.marketReach || "Market Reach",
                `
                  ${
                    report.marketReach.summary
                      ? `<p>${esc(report.marketReach.summary)}</p>`
                      : ""
                  }

                  ${
                    report.marketReach.primaryCustomers
                      ? `
                        <h3>${esc(t.primaryCustomers || "Primary Customers")}</h3>
                        ${list(report.marketReach.primaryCustomers)}
                      `
                      : ""
                  }

                  ${
                    report.marketReach.distributionChannels
                      ? `
                        <h3>${esc(
                          t.distributionChannels ||
                            "Distribution Channels"
                        )}</h3>
                        ${list(report.marketReach.distributionChannels)}
                      `
                      : ""
                  }
                `
              )
            : ""
        }

        ${
          report.opportunity
            ? section(
                t.opportunity || "Opportunity",
                `
                  ${
                    report.opportunity.summary
                      ? `<p>${esc(report.opportunity.summary)}</p>`
                      : ""
                  }

                  ${
                    report.opportunity.underservedNeeds
                      ? `
                        <h3>${esc(
                          t.underservedNeeds || "Underserved Needs"
                        )}</h3>
                        ${list(report.opportunity.underservedNeeds)}
                      `
                      : ""
                  }
                `
              )
            : ""
        }

        ${
          report.swot
            ? section(
                t.swot || "SWOT Analysis",
                `
                  <div class="grid">

                    <div class="card">
                      <h3>${esc(t.strengths || "Strengths")}</h3>
                      ${list(report.swot.strengths)}
                    </div>

                    <div class="card">
                      <h3>${esc(t.weaknesses || "Weaknesses")}</h3>
                      ${list(report.swot.weaknesses)}
                    </div>

                    <div class="card">
                      <h3>${esc(t.opportunities || "Opportunities")}</h3>
                      ${list(report.swot.opportunities)}
                    </div>

                    <div class="card">
                      <h3>${esc(t.threats || "Threats")}</h3>
                      ${list(report.swot.threats)}
                    </div>

                  </div>
                `
              )
            : ""
        }

        ${
          report.localThreats
            ? section(
                t.localThreats || "Local Threats",
                list(report.localThreats)
              )
            : ""
        }

        ${
          report.competitors
            ? section(
                t.competitors || "Competitors",
                `
                  ${
                    report.competitors.summary
                      ? `<p>${esc(report.competitors.summary)}</p>`
                      : ""
                  }

                  ${
                    report.competitors.mainCompetitors
                      ? `
                        <h3>${esc(
                          t.mainCompetitors || "Main Competitors"
                        )}</h3>
                        ${list(report.competitors.mainCompetitors)}
                      `
                      : ""
                  }

                  ${
                    report.competitors.competitiveAdvantage
                      ? `
                        <h3>${esc(
                          t.competitiveAdvantage ||
                            "Competitive Advantage"
                        )}</h3>
                        <p>${esc(
                          report.competitors.competitiveAdvantage
                        )}</p>
                      `
                      : ""
                  }
                `
              )
            : ""
        }

        ${
          report.pricing
            ? section(
                t.pricing || "Pricing Strategy",
                `
                  ${
                    report.pricing.strategy
                      ? `<p><strong>${esc(
                          t.strategy || "Strategy"
                        )}:</strong> ${esc(report.pricing.strategy)}</p>`
                      : ""
                  }

                  ${
                    report.pricing.suggestion
                      ? `<p><strong>${esc(
                          t.suggestedPricing || "Suggested Pricing"
                        )}:</strong> ${esc(report.pricing.suggestion)}</p>`
                      : ""
                  }

                  ${
                    report.pricing.reason
                      ? `<p><strong>${esc(
                          t.why || "Why"
                        )}:</strong> ${esc(report.pricing.reason)}</p>`
                      : ""
                  }
                `
              )
            : ""
        }

        ${
          report.recommendation
            ? section(
                t.recommendation || "Recommendation",
                `
                  ${
                    report.recommendation.verdict
                      ? `
                        <div class="verdict">
                          ${esc(report.recommendation.verdict)}
                        </div>
                      `
                      : ""
                  }

                  ${
                    report.recommendation.reason
                      ? `<p>${esc(report.recommendation.reason)}</p>`
                      : ""
                  }

                  ${
                    report.recommendation.steps
                      ? `
                        <h3>${esc(
                          t.recommendedSteps || "Recommended Steps"
                        )}</h3>
                        ${list(report.recommendation.steps)}
                      `
                      : ""
                  }
                `
              )
            : ""
        }

        <!-- FINANCIAL ROADMAP -->
        <div style="page-break-before:always;"></div>

        ${section(
          t.financialRoadmap || "Financial Roadmap",
          `
            <table class="financial-table">
              <tr>
                <td>${esc(
                  t.yourContribution || "Your Contribution"
                )}</td>
                <td>₹${Number(ownContribution || 0).toLocaleString("en-IN")}</td>
              </tr>

              <tr>
                <td>${esc(
                  t.estimatedProjectCost || "Estimated Project Cost"
                )}</td>
                <td>₹${Number(projectCost || 0).toLocaleString("en-IN")}</td>
              </tr>

              <tr>
                <td>${esc(
                  t.estimatedFundingGap || "Estimated Funding Gap"
                )}</td>
                <td>₹${Number(loanRequired || 0).toLocaleString("en-IN")}</td>
              </tr>

              <tr>
                <td>${esc(t.scheme || "Scheme")}</td>
                <td>${esc(translatedSchemeName || "—")}</td>
              </tr>

              <tr>
                <td>${esc(t.interestRate || "Interest Rate")}</td>
                <td>${esc(annualInterest || "—")}%</td>
              </tr>

              <tr>
                <td>${esc(t.tenure || "Tenure")}</td>
                <td>${esc(loanYears || "—")} ${esc(t.years || "years")}</td>
              </tr>

              <tr>
                <td>${esc(t.moratorium || "Moratorium")}</td>
                <td>${esc(moratoriumMonths || "0")} ${esc(
                  t.months || "months"
                )}</td>
              </tr>

              <tr>
                <td>${esc(t.estimatedEmi || "Estimated EMI")}</td>
                <td>₹${Number(emi || 0).toLocaleString("en-IN")}</td>
              </tr>
            </table>
          `
        )}

        ${
          t.schemeNote
            ? `
              <div class="note">
                <strong>${esc(t.schemeNote)}</strong>
              </div>
            `
            : ""
        }

        <!-- REPAYMENT ROADMAP -->
        <div style="page-break-before:always;"></div>

        ${section(
          t.repaymentRoadmap || "Repayment Roadmap",
          `
            <div class="roadmap-box">
              <div class="roadmap-step">
                <strong>1.</strong>
                <span>
                  ${esc(
                    t.initialMoratorium ||
                      "Initial moratorium period"
                  )}
                </span>
              </div>

              <div class="roadmap-step">
                <strong>2.</strong>
                <span>
                  ${esc(
                    t.monthlyRepayment ||
                      "Begin regular monthly repayment"
                  )}
                </span>
              </div>

              <div class="roadmap-step">
                <strong>3.</strong>
                <span>
                  ${esc(
                    t.businessGrowth ||
                      "Increase business revenue and maintain repayment discipline"
                  )}
                </span>
              </div>

              <div class="roadmap-step">
                <strong>4.</strong>
                <span>
                  ${esc(
                    t.futureExpansion ||
                      "Use improved cash flow for future expansion"
                  )}
                </span>
              </div>
            </div>
          `
        )}

        <!-- FOOTER -->
        <div style="
          margin-top:25px;
          padding-top:12px;
          border-top:1px solid #ddd;
          text-align:center;
          font-size:9px;
          opacity:.65;
        ">
          GramSaarthi AI • ${new Date().toLocaleDateString("en-IN")}
        </div>

      </div>

      <style>
        .pdf-section {
          margin-bottom: 18px;
          page-break-inside: avoid;
        }

        .pdf-section h2 {
          font-size: 19px;
          margin: 0 0 10px;
          padding-bottom: 5px;
          border-bottom: 2px solid #2f855a;
        }

        .pdf-section h3 {
          font-size: 13px;
          margin: 12px 0 5px;
        }

        .info-box,
        .card,
        .note,
        .roadmap-box,
        .verdict {
          border: 1px solid #d7d7d7;
          border-radius: 8px;
          padding: 10px;
          margin: 8px 0;
          background: #fafafa;
        }

        .verdict {
          font-size: 15px;
          font-weight: bold;
          text-align: center;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .financial-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        .financial-table td {
          border: 1px solid #d7d7d7;
          padding: 8px;
        }

        .financial-table td:first-child {
          font-weight: 600;
        }

        .roadmap-step {
          display: flex;
          gap: 10px;
          padding: 9px 0;
          border-bottom: 1px solid #ddd;
        }

        .roadmap-step:last-child {
          border-bottom: none;
        }

        @media print {
          .pdf-section {
            page-break-inside: avoid;
          }
        }
      </style>
    `;

    const container = document.createElement("div");

    container.style.position = "fixed";
    container.style.left = "-100000px";
    container.style.top = "0";
    container.style.width = "210mm";
    container.style.background = "#ffffff";
    container.innerHTML = html;

    document.body.appendChild(container);

    const options = {
      margin: [8, 8, 12, 8],
      filename: "GramSaarthi-AI-Business-Report.pdf",

      image: {
        type: "jpeg",
        quality: 0.98,
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      },

      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },

      pagebreak: {
        mode: ["css", "legacy"],
      },
    };

    const worker = html2pdf()
      .set(options)
      .from(container)
      .toPdf();

    const pdf = await worker.get("pdf");

    const totalPages = pdf.internal.getNumberOfPages();

    for (let page = 1; page <= totalPages; page++) {
      pdf.setPage(page);
      pdf.setFontSize(8);

      pdf.text(
        `${page} / ${totalPages}`,
        105,
        290,
        { align: "center" }
      );
    }

    await worker.save();

    document.body.removeChild(container);

  } catch (error) {
    console.error("PDF generation error:", error);
    alert("PDF could not be generated. Please try again.");
  }
};
      
    return (
      <div className="assessment-page">
        <div className="assessment-header">
          <div className="logo">
            <span>🌱</span> GramSaarthi AI
          </div>

          <span className="step-text">
            {t.financialPlanner}
          </span>
        </div>

        <div className="assessment-container">
          <div className="assessment-intro">
            <p className="small-label">
              {t.smartFinancialPlanning}
            </p>

            <h1>
              {t.planFunding}
            </h1>

            <p>{t.financeDesc}</p>
          </div>

          <div className="finance-summary">
            <div className="finance-card">
              <span>
                {t.estimatedProjectCost}
              </span>

              <strong>
                ₹
                {projectCost.toLocaleString()}
              </strong>
            </div>

            <div className="finance-card">
              <span>
                {t.yourContribution}
              </span>

              <strong>
                ₹
                {ownContribution.toLocaleString()}
              </strong>
            </div>

            <div className="finance-card">
              <span>
                {t.estimatedFundingGap}
              </span>

              <strong>
                ₹
                {loanRequired.toLocaleString()}
              </strong>
            </div>
          </div>

          <div className="finance-section">
            <div className="market-section-title">
              <div>
                <p className="small-label">
                  {t.loanPreview}
                </p>

                <h2>
                  {t.possibleRepayment}
                </h2>
              </div>

              <span className="demo-badge">
                {t.illustrative}
              </span>
            </div>

            <div className="loan-details">
              <div>
                <span>
                  {t.loanAmount}
                </span>

                <strong>
                  ₹
                  {loanRequired.toLocaleString()}
                </strong>
              </div>

              <div>
                <span>
                  {t.interestRate}
                </span>

                <strong>
                  {annualInterest}% p.a.
                </strong>
              </div>

              <div>
                <span>{t.tenure}</span>

                <strong>
                  {loanYears} years
                </strong>
              </div>

              <div>
                <span>{t.scheme}</span>

                <strong>
                  {translatedSchemeName}
                </strong>
              </div>

              <div>
                <span>
                  {t.moratorium}
                </span>

                <strong>
                  {moratoriumMonths} months
                </strong>
              </div>

              <div>
                <span>
                  {t.estimatedEmi}
                </span>

                <strong>
                  ₹
                  {Math.round(
                    emi
                  ).toLocaleString()}
                </strong>
              </div>
            </div>
          </div>

          <div className="finance-section">
            <div className="market-section-title">
              <div>
                <p className="small-label">
                  {t.repaymentRoadmap}
                </p>

                <h2>
                  {t.repaymentJourney}
                </h2>
              </div>
            </div>

            <div className="loan-details">
              <div>
                <span>
                  {t.initialMoratorium}
                </span>

                <strong>
                  {moratoriumMonths} months
                </strong>
              </div>

              <div>
                <span>
                  {t.repaymentPeriod}
                </span>

                <strong>
                  {loanYears} years
                </strong>
              </div>

              <div>
                <span>
                  {t.monthlyEmi}
                </span>

                <strong>
                  ₹
                  {Math.round(
                    emi
                  ).toLocaleString()}
                </strong>
              </div>

              <div>
                <span>
                  {t.annualEmi}
                </span>

                <strong>
                  ₹
                  {Math.round(
                    emi * 12
                  ).toLocaleString()}
                </strong>
              </div>
            </div>

            <p className="scheme-note">
              {t.schemeNote}
            </p>
          </div>

          <button
            className="continue-btn"
            onClick={downloadReport}
          >
            📄 {t.downloadReport}
          </button>

          {pdfReport?.available && pdfReport?.data && (
            <button
              className="continue-btn"
              onClick={downloadPdfReport}
            >
              📄 {t.downloadCompleteReport}
            </button>
          )}

          <div className="scheme-section">
            <p className="small-label">
              {t.supportOpportunities}
            </p>

            <h2>
              {t.exploreSupport}
            </h2>

            <div className="scheme-card">
              <div className="scheme-icon">
                🏛️
              </div>

              <div>
                <h3>
                  {t.governmentBankSupport}
                </h3>

                <p>
                  {t.supportDesc}
                </p>
              </div>

              <span>{t.explore}</span>
            </div>

            <p className="scheme-note">
              {t.supportNote}
            </p>
          </div>

          <div className="finance-advice">
            <strong>
              💡{" "}
              {t.gramSaarthiRecommendation}
            </strong>

            <p>
              {t.financeAdvice}
            </p>
          </div>

          <button
            className="continue-btn"
            onClick={() =>
              speakText(t.financeAdvice)
            }
          >
            {isSpeaking ? t.audioLoading : `🔊 ${t.listen}`}
          </button>

          <button
            className="continue-btn"
            onClick={() =>
              setPage("roadmap")
            }
          >
            {t.generateRoadmap} →
          </button>
        </div>
      </div>
              
    );
  }

  /* =========================================================
     ROADMAP PAGE
  ========================================================= */

  if (page === "roadmap") {
    const monthlyRevenue =
      simulator.customers *
      simulator.price *
      26;

    const monthlyProfit =
      monthlyRevenue -
      simulator.expenses;

    return (
      <div className="assessment-page">
        <div className="assessment-header">
          <div className="logo">
            <span>🌱</span> GramSaarthi AI
          </div>

          <span className="step-text">
            {t.yourBusinessRoadmap}
          </span>
        </div>

        <div className="assessment-container">
          <div className="assessment-intro">
            <p className="small-label">
              {t.personalizedRoadmap}
            </p>

            <h1>
              {t.pathIdeaAction}
            </h1>

            <p>
              {t.roadmapDesc}
            </p>
          </div>

          <div className="roadmap-hero">
            <div>
              <span className="result-rank">
                {t.recommendedBusiness}
              </span>

              <h2>
                {
                  translatedRecommendation.name
                }
              </h2>

              <p>
                {
                  translatedRecommendation.reason
                }
              </p>
            </div>

            <div className="roadmap-score">
              <strong>
                {recommendation.score}
              </strong>

              <span>/100</span>

              <small>
                {t.matchScore}
              </small>
            </div>
          </div>

          <div className="roadmap-section">
            <p className="small-label">
              {t.startingPoint}
            </p>

            <div className="starting-grid">
              <div>
                <span>
                  {t.location}
                </span>

                <strong>
                  {formData.location ||
                    t.notSpecified}
                </strong>
              </div>

              <div>
                <span>
                  {t.capital}
                </span>

                <strong>
                  ₹
                  {Number(
                    formData.capital ||
                      0
                  ).toLocaleString()}
                </strong>
              </div>

              <div>
                <span>
                  {t.skills}
                </span>

                <strong>
                  {formData.skills ||
                    t.notSpecified}
                </strong>
              </div>

              <div>
                <span>
                  {t.resources}
                </span>

                <strong>
                  {formData.resources ||
                    t.notSpecified}
                </strong>
              </div>
            </div>
          </div>

          <div className="roadmap-section">
            <p className="small-label">
              {t.actionPlan}
            </p>

            <h2>
              {t.startSmall}
            </h2>

            <div className="roadmap-timeline">
              <div className="timeline-item">
                <div className="timeline-number">
                  01
                </div>

                <div>
                  <h3>
                    {t.validateDemand}
                  </h3>

                  <p>
                    {
                      t.validateDemandDesc
                    }
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-number">
                  02
                </div>

                <div>
                  <h3>
                    {t.smallPilot}
                  </h3>

                  <p>
                    {t.smallPilotDesc}
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-number">
                  03
                </div>

                <div>
                  <h3>
                    {t.trackNumbers}
                  </h3>

                  <p>
                    {
                      t.trackNumbersDesc
                    }
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-number">
                  04
                </div>

                <div>
                  <h3>
                    {t.scaleCarefully}
                  </h3>

                  <p>
                    {
                      t.scaleCarefullyDesc
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="roadmap-metrics">
            <div>
              <span>
                {
                  t.estimatedMonthlyRevenue
                }
              </span>

              <strong>
                ₹
                {monthlyRevenue.toLocaleString()}
              </strong>
            </div>

            <div>
              <span>
                {
                  t.estimatedMonthlyProfit
                }
              </span>

              <strong>
                ₹
                {monthlyProfit.toLocaleString()}
              </strong>
            </div>

            <div>
              <span>
                {t.businessRisk}
              </span>

              <strong>
                {translateRisk(
                  recommendation.risk
                )}
              </strong>
            </div>
          </div>

          <div className="final-message">
            <div className="final-icon">
              🌱
            </div>

            <div>
              <h3>
                {t.finalAdvice}
              </h3>

              <p>
                {t.finalAdviceDesc}
              </p>
            </div>
          </div>

          <button
            className="continue-btn"
            onClick={() =>
              speakText(t.finalAdviceDesc)
            }
          >
            {isSpeaking ? t.audioLoading : `🔊 ${t.listen}`}
          </button>

          <button
            className="continue-btn"
            onClick={() =>
              setPage("home")
            }
          >
            ← {t.backToGramSaarthi}
          </button>
        </div>
      </div>
    );
  }
  

  /* =========================================================
     ASSESSMENT PAGE
  ========================================================= */

  if (page === "assessment") {
    return (
      <div className="assessment-page">
        <div className="assessment-header">
          <div className="logo">
            <span>🌱</span> GramSaarthi AI
          </div>

          <span className="step-text">
            {t.step1}
          </span>
        </div>

        <div className="assessment-container">
          <div className="assessment-intro">
            <p className="small-label">
              {t.assessment}
            </p>

            <h1>
              {t.tellSituation}
            </h1>

            <p>
              {t.assessmentDesc}
            </p>
          </div>

          <div className="form-card">
            <div className="voice-input-card">
  <div className="voice-title">
    🎙️ Voice Input
  </div>

  <p className="voice-subtitle">
    Speak your situation naturally
  </p>

  <button
    type="button"
    onClick={startVoiceInput}
    className={isListening ? "voice-btn listening" : "voice-btn"}
  >
    {isListening ? "🔴 Listening..." : "🎤 Tap to Speak"}
  </button>

  {voiceText && (
    <div className="voice-text">
      {voiceText}
    </div>
  )}
</div>
            <label>
  📍 {t.location}

  <input
    type="text"
    placeholder={t.locationPlaceholder}
    value={formData.location}
    onChange={(e) =>
      setFormData({
        ...formData,
        location: e.target.value,
      })
    }
  />

  <div className="map-preview">
    {formData.location ? (
      <iframe
        title="Location Map"
        src={`https://www.google.com/maps?q=${encodeURIComponent(
          formData.location
        )}&output=embed`}
        width="100%"
        height="250"
        style={{
          border: 0,
          borderRadius: "16px",
        }}
        loading="lazy"
      ></iframe>
    ) : (
      <div className="map-placeholder">
        📍 Enter your location to view the map
      </div>
    )}
  </div>
</label>
            <label>
              💰 {t.capital}

              <input
                type="number"
                placeholder={
                  t.capitalPlaceholder
                }
                value={
                  formData.capital
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    capital:
                      e.target.value,
                  })
                }
              />
            </label>

            <label>
              🌐 {t.language}

              <select
                value={
                  formData.language
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    language:
                      e.target.value,
                  })
                }
              >
                <option value="English">
                  English
                </option>

                <option value="Gujarati">
                  ગુજરાતી
                </option>

                <option value="Hindi">
                  हिन्दी
                </option>

                <option value="Marathi">
                  मराठी
                </option>

                <option value="Punjabi">
                  ਪੰਜਾਬੀ
                </option>

                <option value="Bengali">
                  বাংলা
                </option>

                <option value="Tamil">
                  தமிழ்
                </option>

                <option value="Telugu">
                  తెలుగు
                </option>

                <option value="Kannada">
                  ಕನ್ನಡ
                </option>

                <option value="Malayalam">
                  മലയാളം
                </option>

                <option value="Odia">
                  ଓଡ଼ିଆ
                </option>
              </select>
            </label>

            <label>
              🛠️ {t.skills}

              <input
                type="text"
                placeholder={
                  t.skillsPlaceholder
                }
                value={formData.skills}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills:
                      e.target.value,
                  })
                }
              />
            </label>

            <label>
              🌾 {t.resources}

              <input
                type="text"
                placeholder={
                  t.resourcesPlaceholder
                }
                value={
                  formData.resources
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    resources:
                      e.target.value,
                  })
                }
              />
            </label>

            <label>
              💡 {t.businessIdea}

              <select
                value={
                  formData.business
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    business:
                      e.target.value,
                  })
                }
              >
                <option value="">
                  {t.selectBusiness}
                </option>

                {businessOptions.map(
                  ([value, key]) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {t[key]}
                    </option>
                  )
                )}

                <option value="Cooking / Catering">
                  {formData.language ===
                  "English"
                    ? "Cooking / Catering"
                    : formData.language ===
                      "Gujarati"
                    ? "રસોઈ / કેટરિંગ"
                    : formData.language ===
                      "Hindi"
                    ? "खाना बनाना / कैटरिंग"
                    : formData.language ===
                      "Marathi"
                    ? "स्वयंपाक / केटरिंग"
                    : formData.language ===
                      "Punjabi"
                    ? "ਖਾਣਾ ਬਣਾਉਣਾ / ਕੇਟਰਿੰਗ"
                    : formData.language ===
                      "Bengali"
                    ? "রান্না / ক্যাটারিং"
                    : formData.language ===
                      "Tamil"
                    ? "சமையல் / கேட்டரிங்"
                    : formData.language ===
                      "Telugu"
                    ? "వంట / క్యాటరింగ్"
                    : formData.language ===
                      "Kannada"
                    ? "ಅಡುಗೆ / ಕ್ಯಾಟರಿಂಗ್"
                    : formData.language ===
                      "Malayalam"
                    ? "പാചകം / കാറ്ററിംഗ്"
                    : "ରୋଷେଇ / କ୍ୟାଟରିଂ"}
                </option>

                <option value="Vermicompost / Organic Inputs">
                  {formData.language ===
                  "English"
                    ? "Vermicompost / Organic Inputs"
                    : formData.language ===
                      "Gujarati"
                    ? "વર્મીકમ્પોસ્ટ / સજીવ ઇનપુટ્સ"
                    : formData.language ===
                      "Hindi"
                    ? "वर्मी कम्पोस्ट / जैविक इनपुट"
                    : formData.language ===
                      "Marathi"
                    ? "वर्मीकंपोस्ट / सेंद्रिय इनपुट"
                    : formData.language ===
                      "Punjabi"
                    ? "ਵਰਮੀਕੰਪੋਸਟ / ਜੈਵਿਕ ਇਨਪੁਟ"
                    : formData.language ===
                      "Bengali"
                    ? "ভার্মিকম্পোস্ট / জৈব উপকরণ"
                    : formData.language ===
                      "Tamil"
                    ? "மண்புழு உரம் / இயற்கை உள்ளீடுகள்"
                    : formData.language ===
                      "Telugu"
                    ? "వర్మీకంపోస్ట్ / సేంద్రీయ ఇన్‌పుట్స్"
                    : formData.language ===
                      "Kannada"
                    ? "ವರ್ಮಿಕಾಂಪೋಸ್ಟ್ / ಸಾವಯವ ಇನ್‌ಪುಟ್ಸ್"
                    : formData.language ===
                      "Malayalam"
                    ? "വെർമികമ്പോസ്റ്റ് / ജൈവ ഇൻപുട്ടുകൾ"
                    : "ଭର୍ମିକମ୍ପୋଷ୍ଟ / ଜୈବିକ ଉପାଦାନ"}
                </option>

                <option value="Other">
                  {formData.language ===
                  "English"
                    ? "Other"
                    : formData.language ===
                      "Gujarati"
                    ? "અન્ય"
                    : formData.language ===
                      "Hindi"
                    ? "अन्य"
                    : formData.language ===
                      "Marathi"
                    ? "इतर"
                    : formData.language ===
                      "Punjabi"
                    ? "ਹੋਰ"
                    : formData.language ===
                      "Bengali"
                    ? "অন্যান্য"
                    : formData.language ===
                      "Tamil"
                    ? "மற்றவை"
                    : formData.language ===
                      "Telugu"
                    ? "ఇతర"
                    : formData.language ===
                      "Kannada"
                    ? "ಇತರೆ"
                    : formData.language ===
                      "Malayalam"
                    ? "മറ്റുള്ളവ"
                    : "ଅନ୍ୟ"}
                </option>

                <option value="Suggest a business for me">
                  {formData.language ===
                  "English"
                    ? "Suggest a business for me"
                    : formData.language ===
                      "Gujarati"
                    ? "મારા માટે વ્યવસાય સૂચવો"
                    : formData.language ===
                      "Hindi"
                    ? "मेरे लिए व्यवसाय सुझाएं"
                    : formData.language ===
                      "Marathi"
                    ? "माझ्यासाठी व्यवसाय सुचवा"
                    : formData.language ===
                      "Punjabi"
                    ? "ਮੇਰੇ ਲਈ ਕਾਰੋਬਾਰ ਸੁਝਾਓ"
                    : formData.language ===
                      "Bengali"
                    ? "আমার জন্য একটি ব্যবসা প্রস্তাব করুন"
                    : formData.language ===
                      "Tamil"
                    ? "எனக்கான வணிகத்தைப் பரிந்துரைக்கவும்"
                    : formData.language ===
                      "Telugu"
                    ? "నా కోసం వ్యాపారాన్ని సూచించండి"
                    : formData.language ===
                      "Kannada"
                    ? "ನನಗಾಗಿ ವ್ಯವಹಾರವನ್ನು ಸೂಚಿಸಿ"
                    : formData.language ===
                      "Malayalam"
                    ? "എനിക്കായി ഒരു ബിസിനസ് നിർദ്ദേശിക്കുക"
                    : "ମୋ ପାଇଁ ଏକ ବ୍ୟବସାୟ ସୁପାରିଶ କରନ୍ତୁ"}
                </option>
              </select>
            </label>

            <button
  className="continue-btn"
  onClick={async () => {
    console.log("🚀 AI ANALYSIS BUTTON CLICKED");

    try {
      const payload = {
        location: formData.location,
        capital: formData.capital,
        business: formData.business,
        skills: formData.skills,
        resources: formData.resources,
        language: formData.language,
      };

      const response = await fetch(
        "https://gram-saarthi-ai-five.vercel.app/api/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("📡 Backend status:", response.status);

      const data = await response.json();

      console.log("🤖 AI response:", data);

      if (data.success) {
        setAiResult(data.result || "");
        setBankReadyReport(data.bankReadyReport || null);
        setPdfReport(data.pdf || null);
        setPage("results");
      } else {
        console.error("❌ AI response error:", data);
        alert(data.error || data.message || t.aiAnalysisFailed);
      }
    } catch (error) {
      console.error("❌ Connection error:", error);
      alert(t.backendError);
    }
  }}
>
  {t.continue} →
</button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     HOME PAGE
  ========================================================= */

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <span>🌱</span> GramSaarthi AI
        </div>

        <div className="nav-links">
          <a href="#features">
            {t.features}
          </a>

          <a href="#how">
            {t.howItWorks}
          </a>

          <button
            onClick={() =>
              setPage("assessment")
            }
          >
            {t.startAssessment}
          </button>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-text">
            <div className="badge">
              ✦ {t.aiPoweredAdvisor}
            </div>

            <h1>
              {t.smarterBusiness}
            </h1>

            <p>{t.heroDesc}</p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={() =>
                  setPage(
                    "assessment"
                  )
                }
              >
                {t.startBusinessAssessment}{" "}
                →
              </button>

              <button
                className="secondary-btn"
                onClick={() =>
                  document
                    .getElementById(
                      "features"
                    )
                    ?.scrollIntoView({
                      behavior:
                        "smooth",
                    })
                }
              >
                {t.exploreFeatures}
              </button>
            </div>

            <div className="trust">
              <span>
                ✓ {t.simpleToUse}
              </span>

              <span>
                ✓ {t.localInsights}
              </span>

              <span>
                ✓{" "}
                {
                  t.smartFinancialPlanning
                }
              </span>
            </div>
          </div>

          <div className="hero-card">
            <div className="card-top">
              <span>
                {t.aiBusinessAdvisor}
              </span>

              <span className="online">
                ● {t.online}
              </span>
            </div>

            <div className="advisor-message">
              <div className="ai-icon">
                🌱
              </div>

              <div>
                <strong>
                  {t.namaste} 👋
                </strong>

                <p>
                  {t.tellSituation}
                </p>
              </div>
            </div>

            <div className="mini-input">
              <span>💬</span>

              <span>
                {t.askGramSaarthi}
              </span>

              <button
                onClick={() =>
                  setPage(
                    "assessment"
                  )
                }
              >
                →
              </button>
            </div>
          </div>
        </section>

        <section
          className="features"
          id="features"
        >
          <div className="section-heading">
            <p>
              {t.whatWeOffer}
            </p>

            <h2>
              {
                t.everythingBeforeInvest
              }
            </h2>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon">
                🧠
              </div>

              <h3>
                {
                  t.aiBusinessMatching
                }
              </h3>

              <p>
                {
                  t.aiBusinessMatchingDesc
                }
              </p>
            </div>

            <div className="feature-card">
              <div className="icon">
                🗺️
              </div>

              <h3>
                {
                  t.localMarketAnalysis
                }
              </h3>

              <p>
                {
                  t.localMarketAnalysisDesc
                }
              </p>
            </div>

            <div className="feature-card">
              <div className="icon">
                🧪
              </div>

              <h3>
                {t.businessSimulator}
              </h3>

              <p>
                {
                  t.businessSimulatorDesc
                }
              </p>
            </div>

            <div className="feature-card">
              <div className="icon">
                💰
              </div>

              <h3>
                {
                  t.smartFinancialPlanning
                }
              </h3>

              <p>
                {
                  t.smartFinancialPlanningDesc
                }
              </p>
            </div>
          </div>
        </section>

        <section
          className="how"
          id="how"
        >
          <div className="section-heading">
            <p>
              {t.howItWorksTitle}
            </p>

            <h2>
              {t.fourSteps}
            </h2>
          </div>

          <div className="steps">
            <div>
              <span>01</span>

              <h3>
                {t.tellUsAboutYou}
              </h3>

              <p>
                {
                  t.tellUsAboutYouDesc
                }
              </p>
            </div>

            <div>
              <span>02</span>

              <h3>
                {
                  t.discoverOpportunities
                }
              </h3>

              <p>
                {
                  t.discoverOpportunitiesDesc
                }
              </p>
            </div>

            <div>
              <span>03</span>

              <h3>
                {t.testYourIdea}
              </h3>

              <p>
                {
                  t.testYourIdeaDesc
                }
              </p>
            </div>

            <div>
              <span>04</span>

              <h3>
                {
                  t.planWithConfidence
                }
              </h3>

              <p>
                {
                  t.planWithConfidenceDesc
                }
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <strong>
          🌱 GramSaarthi AI
        </strong>

        <span>
          {t.footerText}
        </span>
      </footer>
    </div>
  );
}

export default App;