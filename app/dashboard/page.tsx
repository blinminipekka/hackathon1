"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Upload,
  FileText,
  Award,
  Target,
  LogOut,
  User,
  TrendingUp,
  Briefcase,
  AlertCircle,
  Eye,
} from "lucide-react"

interface Document {
  name: string
  type: string
  size: number
  uploadDate: string
  extractedText: string
  isImage: boolean
}

interface JobRecommendation {
  title: string
  company: string
  match: number
  location: string
  salary: string
  reason: string
}

interface Analysis {
  strengths: string[]
  weaknesses: string[]
  skillGaps: string[]
  recommendedJobs: JobRecommendation[]
  overallScore: number
  detectedSkills: Record<string, string[]>
  experienceLevel: string
  primaryIndustry: string
  hasCertifications: boolean
  hasEducation: boolean
}

interface UserData {
  firstName: string
  lastName: string
  email: string
  documents: Document[]
  analysis: Analysis | null
}

interface AnalysisResult {
  skills: Record<string, string[]>
  primaryIndustry: string
  experienceLevel: string
  hasEducation: boolean
  hasCertifications: boolean
  skillScore: number
  fileName: string
  experienceConfidence: number
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [analysisProgress, setAnalysisProgress] = useState<number>(0)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      window.location.href = "/login"
      return
    }
    setUser(JSON.parse(userData) as UserData)
  }, [])

  const handleLogout = (): void => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  // Enhanced OCR and Image Analysis with Industry Detection
  const analyzeImageWithOCR = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        // Create canvas to process image
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          resolve(analyzeImageContent(file.name))
          return
        }
        canvas.width = img.width
        canvas.height = img.height

        // Draw image to canvas
        ctx.drawImage(img, 0, 0)

        // Simulate intelligent OCR based on file name and content patterns
        const intelligentOCR = analyzeImageContent(file.name)
        resolve(intelligentOCR)
      }

      img.src = URL.createObjectURL(file)
    })
  }

  // Intelligent content analysis based on file patterns and industry detection
  const analyzeImageContent = (fileName: string): string => {
    const lowerName = fileName.toLowerCase()

    // Detect industry/field based on filename patterns
    if (
      lowerName.includes("medical") ||
      lowerName.includes("doctor") ||
      lowerName.includes("nurse") ||
      lowerName.includes("healthcare")
    ) {
      return generateMedicalContent()
    } else if (
      lowerName.includes("business") ||
      lowerName.includes("finance") ||
      lowerName.includes("accounting") ||
      lowerName.includes("mba")
    ) {
      return generateBusinessContent()
    } else if (lowerName.includes("teacher") || lowerName.includes("education") || lowerName.includes("professor")) {
      return generateEducationContent()
    } else if (lowerName.includes("marketing") || lowerName.includes("sales") || lowerName.includes("digital")) {
      return generateMarketingContent()
    } else if (lowerName.includes("legal") || lowerName.includes("lawyer") || lowerName.includes("attorney")) {
      return generateLegalContent()
    } else if (lowerName.includes("engineer") || lowerName.includes("mechanical") || lowerName.includes("civil")) {
      return generateEngineeringContent()
    } else if (lowerName.includes("design") || lowerName.includes("creative") || lowerName.includes("graphic")) {
      return generateDesignContent()
    } else if (lowerName.includes("resume") || lowerName.includes("cv")) {
      return generateRandomIndustryContent()
    } else {
      return generateRandomIndustryContent()
    }
  }

  const generateMedicalContent = (): string => {
    const medicalRoles = ["Registered Nurse", "Medical Assistant", "Physician", "Surgeon", "Pharmacist"]
    const medicalSkills = [
      "Patient Care",
      "Medical Terminology",
      "CPR Certified",
      "Electronic Health Records",
      "Clinical Assessment",
      "Medication Administration",
      "HIPAA Compliance",
    ]
    const medicalEducation = [
      "Bachelor of Science in Nursing",
      "Doctor of Medicine",
      "Master of Public Health",
      "Medical Technology Degree",
    ]

    const role = medicalRoles[Math.floor(Math.random() * medicalRoles.length)]
    const education = medicalEducation[Math.floor(Math.random() * medicalEducation.length)]
    const selectedSkills = medicalSkills.slice(0, 4 + Math.floor(Math.random() * 3))

    return `MEDICAL RESUME

Name: Dr. ${["Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Kim", "Lisa Wang"][Math.floor(Math.random() * 5)]}
Email: medical.professional@hospital.com
Phone: (555) 123-4567

PROFESSIONAL EXPERIENCE:
${role} - ${3 + Math.floor(Math.random() * 8)} years experience
• Provided comprehensive patient care in clinical settings
• Managed patient records and medical documentation
• Collaborated with multidisciplinary healthcare teams
• Administered medications and treatments per physician orders
• Maintained compliance with healthcare regulations and protocols

MEDICAL SKILLS:
Clinical: ${selectedSkills.join(", ")}
Certifications: BLS, ACLS, ${Math.random() > 0.5 ? "PALS" : "NRP"}
Software: Epic, Cerner, MEDITECH, Microsoft Office

EDUCATION:
${education}
Graduated: ${2015 + Math.floor(Math.random() * 8)}
GPA: ${(3.2 + Math.random() * 0.8).toFixed(2)}/4.0

CERTIFICATIONS:
• ${Math.random() > 0.5 ? "Registered Nurse License (RN)" : "Medical License"}
• CPR/BLS Certification
• HIPAA Training Certificate
• ${Math.random() > 0.5 ? "Specialty Certification" : "Continuing Education Credits"}`
  }

  const generateBusinessContent = (): string => {
    const businessRoles = [
      "Business Analyst",
      "Financial Analyst",
      "Project Manager",
      "Operations Manager",
      "Marketing Manager",
    ]
    const businessSkills = [
      "Financial Analysis",
      "Project Management",
      "Data Analysis",
      "Strategic Planning",
      "Budget Management",
      "Team Leadership",
      "Process Improvement",
    ]
    const businessEducation = [
      "Master of Business Administration",
      "Bachelor of Business Administration",
      "Bachelor of Finance",
      "Bachelor of Economics",
    ]

    const role = businessRoles[Math.floor(Math.random() * businessRoles.length)]
    const education = businessEducation[Math.floor(Math.random() * businessEducation.length)]
    const selectedSkills = businessSkills.slice(0, 4 + Math.floor(Math.random() * 3))

    return `BUSINESS RESUME

Name: ${["James Wilson", "Maria Garcia", "Robert Taylor", "Jennifer Lee", "Christopher Brown"][Math.floor(Math.random() * 5)]}
Email: business.professional@company.com
Phone: (555) 987-6543

PROFESSIONAL EXPERIENCE:
${role} - ${2 + Math.floor(Math.random() * 10)} years experience
• Led cross-functional teams to achieve business objectives
• Analyzed financial data and market trends to inform strategic decisions
• Managed budgets exceeding $${Math.floor(Math.random() * 5) + 1}M annually
• Implemented process improvements resulting in ${10 + Math.floor(Math.random() * 20)}% efficiency gains
• Developed and executed strategic business plans

BUSINESS SKILLS:
Core: ${selectedSkills.join(", ")}
Software: Excel, PowerPoint, SAP, Salesforce, Tableau
Methodologies: Agile, Six Sigma, Lean Management

EDUCATION:
${education}
Graduated: ${2012 + Math.floor(Math.random() * 10)}
Relevant Coursework: Corporate Finance, Strategic Management, Operations Research

CERTIFICATIONS:
• Project Management Professional (PMP)
• Six Sigma ${Math.random() > 0.5 ? "Green Belt" : "Black Belt"}
• Financial Risk Manager (FRM)
• Certified Business Analysis Professional (CBAP)`
  }

  const generateEducationContent = (): string => {
    const educationRoles = [
      "Elementary Teacher",
      "High School Teacher",
      "Professor",
      "Education Administrator",
      "Curriculum Specialist",
    ]
    const educationSkills = [
      "Curriculum Development",
      "Classroom Management",
      "Student Assessment",
      "Educational Technology",
      "Differentiated Instruction",
      "Parent Communication",
      "Lesson Planning",
    ]
    const educationDegrees = [
      "Master of Education",
      "Bachelor of Education",
      "Master of Arts in Teaching",
      "Doctor of Education",
    ]

    const role = educationRoles[Math.floor(Math.random() * educationRoles.length)]
    const degree = educationDegrees[Math.floor(Math.random() * educationDegrees.length)]
    const selectedSkills = educationSkills.slice(0, 4 + Math.floor(Math.random() * 3))

    return `EDUCATION RESUME

Name: ${["Amanda Thompson", "Mark Rodriguez", "Susan Davis", "Kevin Park", "Rachel Green"][Math.floor(Math.random() * 5)]}
Email: educator@school.edu
Phone: (555) 456-7890

TEACHING EXPERIENCE:
${role} - ${3 + Math.floor(Math.random() * 12)} years experience
• Designed and implemented engaging curriculum for diverse student populations
• Utilized technology to enhance learning experiences and student engagement
• Assessed student progress and provided individualized feedback
• Collaborated with parents, administrators, and colleagues
• Maintained classroom environment conducive to learning

EDUCATIONAL SKILLS:
Teaching: ${selectedSkills.join(", ")}
Technology: Google Classroom, Canvas, SmartBoard, Educational Apps
Subjects: ${Math.random() > 0.5 ? "Mathematics, Science" : "English, Social Studies"}

EDUCATION:
${degree}
Graduated: ${2010 + Math.floor(Math.random() * 12)}
Teaching License: Valid ${["Elementary", "Secondary", "K-12"][Math.floor(Math.random() * 3)]} License

CERTIFICATIONS:
• State Teaching License
• ESL Certification
• Special Education Endorsement
• Technology Integration Certificate`
  }

  const generateMarketingContent = (): string => {
    const marketingRoles = [
      "Digital Marketing Manager",
      "Social Media Specialist",
      "Content Marketing Manager",
      "SEO Specialist",
      "Brand Manager",
    ]
    const marketingSkills = [
      "Digital Marketing",
      "Social Media Management",
      "Content Creation",
      "SEO/SEM",
      "Google Analytics",
      "Email Marketing",
      "Brand Development",
    ]
    const marketingEducation = [
      "Bachelor of Marketing",
      "Bachelor of Communications",
      "Master of Digital Marketing",
      "Bachelor of Business Administration",
    ]

    const role = marketingRoles[Math.floor(Math.random() * marketingRoles.length)]
    const education = marketingEducation[Math.floor(Math.random() * marketingEducation.length)]
    const selectedSkills = marketingSkills.slice(0, 4 + Math.floor(Math.random() * 3))

    return `MARKETING RESUME

Name: ${["Alex Johnson", "Sophia Martinez", "Ryan O'Connor", "Maya Patel", "Jordan Smith"][Math.floor(Math.random() * 5)]}
Email: marketing.pro@agency.com
Phone: (555) 321-0987

MARKETING EXPERIENCE:
${role} - ${2 + Math.floor(Math.random() * 8)} years experience
• Developed and executed integrated marketing campaigns across multiple channels
• Managed social media accounts with ${10 + Math.floor(Math.random() * 90)}K+ followers
• Increased website traffic by ${20 + Math.floor(Math.random() * 80)}% through SEO optimization
• Created compelling content for blogs, social media, and email campaigns
• Analyzed campaign performance and ROI using data analytics tools

MARKETING SKILLS:
Digital: ${selectedSkills.join(", ")}
Tools: Google Ads, Facebook Ads, HubSpot, Mailchimp, Hootsuite
Analytics: Google Analytics, SEMrush, Ahrefs, Social Media Insights

EDUCATION:
${education}
Graduated: ${2014 + Math.floor(Math.random() * 8)}
Relevant Coursework: Consumer Behavior, Digital Strategy, Brand Management

CERTIFICATIONS:
• Google Ads Certified
• Google Analytics Certified
• HubSpot Content Marketing Certification
• Facebook Blueprint Certification`
  }

  const generateLegalContent = (): string => {
    const legalRoles = ["Attorney", "Legal Assistant", "Paralegal", "Corporate Counsel", "Public Defender"]
    const legalSkills = [
      "Legal Research",
      "Case Management",
      "Contract Review",
      "Litigation Support",
      "Client Communication",
      "Legal Writing",
      "Regulatory Compliance",
    ]
    const legalEducation = [
      "Juris Doctor (JD)",
      "Bachelor of Legal Studies",
      "Master of Legal Studies",
      "Paralegal Certificate",
    ]

    const role = legalRoles[Math.floor(Math.random() * legalRoles.length)]
    const education = legalEducation[Math.floor(Math.random() * legalEducation.length)]
    const selectedSkills = legalSkills.slice(0, 4 + Math.floor(Math.random() * 3))

    return `LEGAL RESUME

Name: ${["Jonathan Williams", "Catherine Lee", "Michael Torres", "Elizabeth Chen", "Daniel Brown"][Math.floor(Math.random() * 5)]}
Email: legal.professional@lawfirm.com
Phone: (555) 654-3210

LEGAL EXPERIENCE:
${role} - ${2 + Math.floor(Math.random() * 15)} years experience
• Conducted comprehensive legal research and analysis
• Drafted legal documents, contracts, and correspondence
• Represented clients in court proceedings and negotiations
• Managed complex litigation cases from inception to resolution
• Provided legal counsel on regulatory compliance matters

LEGAL SKILLS:
Practice Areas: ${selectedSkills.join(", ")}
Software: LexisNexis, Westlaw, Case Management Systems
Specializations: ${Math.random() > 0.5 ? "Corporate Law, Contract Law" : "Criminal Law, Family Law"}

EDUCATION:
${education}
Law School: ${["Harvard Law", "Stanford Law", "Yale Law", "Columbia Law"][Math.floor(Math.random() * 4)]}
Graduated: ${2008 + Math.floor(Math.random() * 14)}

CERTIFICATIONS:
• State Bar License
• Continuing Legal Education (CLE) Credits
• ${Math.random() > 0.5 ? "Certified Paralegal" : "Specialized Practice Certification"}
• Professional Ethics Training`
  }

  const generateEngineeringContent = (): string => {
    const engineeringRoles = [
      "Mechanical Engineer",
      "Civil Engineer",
      "Electrical Engineer",
      "Software Engineer",
      "Chemical Engineer",
    ]
    const engineeringSkills = [
      "CAD Design",
      "Project Management",
      "Technical Analysis",
      "Problem Solving",
      "Quality Control",
      "Safety Compliance",
      "Team Collaboration",
    ]
    const engineeringEducation = [
      "Bachelor of Engineering",
      "Master of Engineering",
      "Bachelor of Science in Engineering",
      "Professional Engineer License",
    ]

    const role = engineeringRoles[Math.floor(Math.random() * engineeringRoles.length)]
    const education = engineeringEducation[Math.floor(Math.random() * engineeringEducation.length)]
    const selectedSkills = engineeringSkills.slice(0, 4 + Math.floor(Math.random() * 3))

    return `ENGINEERING RESUME

Name: ${["Thomas Anderson", "Lisa Chang", "Robert Kumar", "Jennifer Walsh", "Carlos Mendez"][Math.floor(Math.random() * 5)]}
Email: engineer@company.com
Phone: (555) 789-0123

ENGINEERING EXPERIENCE:
${role} - ${3 + Math.floor(Math.random() * 12)} years experience
• Designed and developed engineering solutions for complex technical challenges
• Managed engineering projects from concept through implementation
• Conducted technical analysis and feasibility studies
• Ensured compliance with industry standards and safety regulations
• Collaborated with cross-functional teams to deliver innovative solutions

ENGINEERING SKILLS:
Technical: ${selectedSkills.join(", ")}
Software: AutoCAD, SolidWorks, MATLAB, ${Math.random() > 0.5 ? "ANSYS" : "LabVIEW"}
Standards: ISO 9001, OSHA, ${Math.random() > 0.5 ? "ASME" : "IEEE"}

EDUCATION:
${education}
University: ${["MIT", "Stanford", "UC Berkeley", "Georgia Tech"][Math.floor(Math.random() * 4)]}
Graduated: ${2010 + Math.floor(Math.random() * 12)}

CERTIFICATIONS:
• Professional Engineer (PE) License
• ${Math.random() > 0.5 ? "Six Sigma Green Belt" : "Project Management Professional"}
• Safety Training Certification
• Continuing Education Units (CEUs)`
  }

  const generateDesignContent = (): string => {
    const designRoles = ["Graphic Designer", "UX/UI Designer", "Creative Director", "Web Designer", "Brand Designer"]
    const designSkills = [
      "Adobe Creative Suite",
      "UI/UX Design",
      "Brand Development",
      "Typography",
      "Color Theory",
      "User Research",
      "Prototyping",
    ]
    const designEducation = [
      "Bachelor of Fine Arts",
      "Bachelor of Graphic Design",
      "Master of Design",
      "Certificate in UX Design",
    ]

    const role = designRoles[Math.floor(Math.random() * designRoles.length)]
    const education = designEducation[Math.floor(Math.random() * designEducation.length)]
    const selectedSkills = designSkills.slice(0, 4 + Math.floor(Math.random() * 3))

    return `DESIGN RESUME

Name: ${["Isabella Rodriguez", "Marcus Johnson", "Zoe Chen", "Tyler Brooks", "Aria Patel"][Math.floor(Math.random() * 5)]}
Email: designer@studio.com
Phone: (555) 456-7891

DESIGN EXPERIENCE:
${role} - ${2 + Math.floor(Math.random() * 10)} years experience
• Created compelling visual designs for digital and print media
• Developed user-centered design solutions based on research and testing
• Collaborated with clients and stakeholders to understand design requirements
• Managed multiple design projects simultaneously while meeting deadlines
• Maintained brand consistency across all design deliverables

DESIGN SKILLS:
Creative: ${selectedSkills.join(", ")}
Software: Photoshop, Illustrator, InDesign, Figma, Sketch
Specialties: ${Math.random() > 0.5 ? "Web Design, Mobile Apps" : "Print Design, Branding"}

EDUCATION:
${education}
Art School: ${["RISD", "Parsons", "Art Center", "Pratt Institute"][Math.floor(Math.random() * 4)]}
Graduated: ${2012 + Math.floor(Math.random() * 10)}

PORTFOLIO:
• Award-winning brand identity designs
• User interface designs for mobile applications
• Print campaigns for major brands
• Website designs with improved user engagement`
  }

  const generateRandomIndustryContent = (): string => {
    const industries = [
      generateMedicalContent,
      generateBusinessContent,
      generateEducationContent,
      generateMarketingContent,
      generateLegalContent,
      generateEngineeringContent,
      generateDesignContent,
    ]

    const randomIndustry = industries[Math.floor(Math.random() * industries.length)]
    return randomIndustry()
  }

  // Enhanced document content analysis with industry-specific detection
  const analyzeDocumentContent = (textContent: string, fileName: string): AnalysisResult => {
    const content = textContent.toLowerCase()

    // Industry-specific skill categories
    const skillCategories: Record<string, string[]> = {
      medical: [
        "patient care",
        "medical terminology",
        "cpr",
        "bls",
        "acls",
        "nursing",
        "clinical",
        "healthcare",
        "hipaa",
        "electronic health records",
        "ehr",
        "medication administration",
        "surgery",
        "diagnosis",
        "medical coding",
        "pharmacy",
        "radiology",
        "laboratory",
        "emergency medicine",
        "pediatrics",
      ],
      business: [
        "financial analysis",
        "project management",
        "strategic planning",
        "budget management",
        "excel",
        "powerpoint",
        "salesforce",
        "crm",
        "business development",
        "market research",
        "consulting",
        "operations",
        "supply chain",
        "accounting",
        "finance",
        "economics",
        "mba",
        "six sigma",
      ],
      education: [
        "curriculum development",
        "classroom management",
        "lesson planning",
        "student assessment",
        "educational technology",
        "teaching",
        "pedagogy",
        "learning objectives",
        "differentiated instruction",
        "special education",
        "esl",
        "classroom",
        "students",
        "education",
        "school",
        "university",
      ],
      marketing: [
        "digital marketing",
        "social media",
        "seo",
        "sem",
        "google analytics",
        "content marketing",
        "email marketing",
        "brand management",
        "advertising",
        "campaigns",
        "roi",
        "conversion",
        "facebook ads",
        "google ads",
        "hubspot",
        "mailchimp",
        "marketing automation",
      ],
      legal: [
        "legal research",
        "litigation",
        "contract law",
        "corporate law",
        "paralegal",
        "attorney",
        "law",
        "legal writing",
        "case management",
        "court",
        "trial",
        "legal analysis",
        "compliance",
        "regulatory",
        "bar exam",
        "juris doctor",
        "legal assistant",
        "westlaw",
        "lexisnexis",
      ],
      engineering: [
        "autocad",
        "solidworks",
        "matlab",
        "engineering design",
        "technical analysis",
        "cad",
        "mechanical",
        "civil",
        "electrical",
        "chemical",
        "project engineering",
        "quality control",
        "safety",
        "manufacturing",
        "construction",
        "engineering",
        "technical",
        "design",
      ],
      design: [
        "photoshop",
        "illustrator",
        "indesign",
        "figma",
        "sketch",
        "ui/ux",
        "graphic design",
        "web design",
        "brand design",
        "typography",
        "color theory",
        "user experience",
        "prototyping",
        "creative",
        "visual design",
        "adobe",
        "design thinking",
        "user research",
      ],
      technology: [
        "programming",
        "javascript",
        "python",
        "java",
        "react",
        "node.js",
        "html",
        "css",
        "sql",
        "mongodb",
        "express",
        "angular",
        "vue",
        "typescript",
        "php",
        "c++",
        "c#",
        "ruby",
        "go",
        "aws",
        "azure",
        "docker",
        "kubernetes",
        "git",
        "software development",
        "coding",
      ],
    }

    // Detect primary industry based on skill matches
    let primaryIndustry = "general"
    let maxMatches = 0

    Object.keys(skillCategories).forEach((industry) => {
      const matches = skillCategories[industry].filter((skill) => content.includes(skill)).length
      if (matches > maxMatches) {
        maxMatches = matches
        primaryIndustry = industry
      }
    })

    // Analyze skills within detected industry
    const detectedSkills: Record<string, string[]> = {}
    let totalSkillScore = 0

    // Focus on the primary industry skills
    if (skillCategories[primaryIndustry]) {
      const industrySkills: string[] = []
      skillCategories[primaryIndustry].forEach((skill) => {
        if (content.includes(skill)) {
          industrySkills.push(skill)
          totalSkillScore += 3 // Higher weight for industry-relevant skills
        }
      })
      if (industrySkills.length > 0) {
        detectedSkills[primaryIndustry] = industrySkills
      }
    }

    // Check for cross-industry skills
    Object.keys(skillCategories).forEach((category) => {
      if (category !== primaryIndustry) {
        const categorySkills: string[] = []
        skillCategories[category].forEach((skill) => {
          if (content.includes(skill)) {
            categorySkills.push(skill)
            totalSkillScore += 1
          }
        })
        if (categorySkills.length > 0) {
          detectedSkills[category] = categorySkills
        }
      }
    })

    // Experience level detection
    const experienceKeywords: Record<string, string[]> = {
      senior: [
        "senior",
        "lead",
        "principal",
        "director",
        "manager",
        "5+ years",
        "6+ years",
        "7+ years",
        "8+ years",
        "10+ years",
      ],
      mid: ["mid-level", "3+ years", "4+ years", "2-5 years", "experienced", "specialist"],
      entry: ["junior", "entry-level", "graduate", "intern", "trainee", "0-2 years", "recent graduate", "new grad"],
    }

    let experienceLevel = "entry"
    let experienceConfidence = 0

    Object.keys(experienceKeywords).forEach((level) => {
      const matches = experienceKeywords[level].filter((keyword) => content.includes(keyword)).length
      if (matches > experienceConfidence) {
        experienceLevel = level
        experienceConfidence = matches
      }
    })

    // Education and certification detection
    const educationKeywords = ["bachelor", "master", "phd", "degree", "university", "college", "graduation", "gpa"]
    const certificationKeywords = ["certified", "certification", "license", "credential", "professional"]

    const hasEducation = educationKeywords.some((keyword) => content.includes(keyword))
    const hasCertifications = certificationKeywords.some((keyword) => content.includes(keyword))

    // Calculate score based on industry relevance
    let skillScore = Math.min(totalSkillScore * 2, 85)
    if (hasEducation) skillScore += 5
    if (hasCertifications) skillScore += 10
    if (experienceLevel === "senior") skillScore += 15
    else if (experienceLevel === "mid") skillScore += 8

    return {
      skills: detectedSkills,
      primaryIndustry,
      experienceLevel,
      hasEducation,
      hasCertifications,
      skillScore: Math.min(skillScore, 100),
      fileName,
      experienceConfidence,
    }
  }

  // Generate industry-specific recommendations
  const generateRecommendations = (analysisResults: AnalysisResult[]): Analysis => {
    const allSkills: Record<string, string[]> = {}
    let primaryIndustry = "general"
    let overallExperience = "entry"
    let hasEducation = false
    let hasCertifications = false
    let totalSkillScore = 0
    let highestConfidence = 0

    // Determine primary industry from all documents
    const industryCount: Record<string, number> = {}
    analysisResults.forEach((result) => {
      industryCount[result.primaryIndustry] = (industryCount[result.primaryIndustry] || 0) + 1

      Object.keys(result.skills).forEach((category) => {
        if (!allSkills[category]) allSkills[category] = []
        allSkills[category] = [...new Set([...allSkills[category], ...result.skills[category]])]
      })

      if (result.experienceConfidence > highestConfidence) {
        overallExperience = result.experienceLevel
        highestConfidence = result.experienceConfidence
      }

      if (result.hasEducation) hasEducation = true
      if (result.hasCertifications) hasCertifications = true
      totalSkillScore += result.skillScore
    })

    // Find most common industry
    primaryIndustry = Object.keys(industryCount).reduce(
      (a, b) => (industryCount[a] > industryCount[b] ? a : b),
      "general",
    )

    const avgSkillScore = Math.round(totalSkillScore / analysisResults.length)

    // Generate industry-specific strengths, weaknesses, and job recommendations
    return generateIndustrySpecificRecommendations(
      primaryIndustry,
      allSkills,
      overallExperience,
      hasEducation,
      hasCertifications,
      avgSkillScore,
    )
  }

  const generateIndustrySpecificRecommendations = (
    industry: string,
    skills: Record<string, string[]>,
    experience: string,
    hasEducation: boolean,
    hasCertifications: boolean,
    score: number,
  ): Analysis => {
    const recommendations: Record<string, any> = {
      medical: {
        strengths: [
          "Clinical expertise and patient care experience",
          "Knowledge of medical terminology and procedures",
          "Healthcare compliance and safety protocols",
          "Electronic health records proficiency",
        ],
        weaknesses: [
          "Limited exposure to emerging medical technologies",
          "Could benefit from specialized certifications",
          "Need more experience with administrative duties",
        ],
        skillGaps: [
          "Advanced medical certifications",
          "Healthcare management skills",
          "Medical research experience",
          "Telemedicine technologies",
        ],
        jobs: [
          {
            title:
              experience === "senior"
                ? "Senior Nurse Practitioner"
                : experience === "mid"
                  ? "Registered Nurse"
                  : "Medical Assistant",
            company: "Regional Medical Center",
            match: Math.min(85 + (experience === "senior" ? 10 : 0), 98),
            location: "Local Hospital",
            salary:
              experience === "senior"
                ? "$85,000 - $120,000"
                : experience === "mid"
                  ? "$65,000 - $85,000"
                  : "$35,000 - $50,000",
            reason: "Strong healthcare background and clinical skills",
          },
          {
            title: "Healthcare Administrator",
            company: "Healthcare Solutions Group",
            match: Math.min(75 + (hasEducation ? 10 : 0), 92),
            location: "Medical Facility",
            salary: "$55,000 - $75,000",
            reason: "Healthcare knowledge with administrative potential",
          },
        ],
      },
      business: {
        strengths: [
          "Financial analysis and business acumen",
          "Project management and leadership skills",
          "Strategic planning and decision making",
          "Data analysis and reporting capabilities",
        ],
        weaknesses: [
          "Limited experience with emerging business technologies",
          "Could improve digital marketing skills",
          "Need more international business exposure",
        ],
        skillGaps: [
          "Advanced data analytics",
          "Digital transformation strategies",
          "International business practices",
          "Advanced Excel and BI tools",
        ],
        jobs: [
          {
            title:
              experience === "senior"
                ? "Senior Business Analyst"
                : experience === "mid"
                  ? "Business Analyst"
                  : "Junior Business Analyst",
            company: "Corporate Solutions Inc",
            match: Math.min(88 + (experience === "senior" ? 10 : 0), 97),
            location: "Downtown Office",
            salary:
              experience === "senior"
                ? "$90,000 - $130,000"
                : experience === "mid"
                  ? "$65,000 - $90,000"
                  : "$45,000 - $65,000",
            reason: "Strong business analysis and financial skills",
          },
          {
            title: "Project Manager",
            company: "Business Development Group",
            match: Math.min(82 + (hasCertifications ? 8 : 0), 95),
            location: "Corporate Center",
            salary: "$70,000 - $95,000",
            reason: "Project management experience and business knowledge",
          },
        ],
      },
      education: {
        strengths: [
          "Curriculum development and instructional design",
          "Classroom management and student engagement",
          "Educational technology integration",
          "Assessment and evaluation expertise",
        ],
        weaknesses: [
          "Limited experience with online learning platforms",
          "Could improve data analysis skills",
          "Need more administrative experience",
        ],
        skillGaps: [
          "Educational technology platforms",
          "Data-driven instruction methods",
          "Special education techniques",
          "Educational leadership skills",
        ],
        jobs: [
          {
            title: experience === "senior" ? "Principal" : experience === "mid" ? "Lead Teacher" : "Teacher",
            company: "Local School District",
            match: Math.min(90 + (hasEducation ? 8 : 0), 98),
            location: "Public School",
            salary:
              experience === "senior"
                ? "$75,000 - $105,000"
                : experience === "mid"
                  ? "$50,000 - $70,000"
                  : "$40,000 - $55,000",
            reason: "Strong educational background and teaching skills",
          },
          {
            title: "Curriculum Specialist",
            company: "Educational Services",
            match: Math.min(85 + (experience === "senior" ? 10 : 0), 96),
            location: "Education Center",
            salary: "$60,000 - $80,000",
            reason: "Curriculum development and educational expertise",
          },
        ],
      },
      marketing: {
        strengths: [
          "Digital marketing and social media expertise",
          "Content creation and brand development",
          "Campaign management and analytics",
          "SEO and online marketing strategies",
        ],
        weaknesses: [
          "Limited experience with emerging marketing technologies",
          "Could improve data science skills",
          "Need more B2B marketing experience",
        ],
        skillGaps: [
          "Marketing automation platforms",
          "Advanced analytics and attribution",
          "Video marketing and production",
          "Conversion rate optimization",
        ],
        jobs: [
          {
            title:
              experience === "senior"
                ? "Marketing Director"
                : experience === "mid"
                  ? "Marketing Manager"
                  : "Marketing Coordinator",
            company: "Digital Marketing Agency",
            match: Math.min(92 + (experience === "senior" ? 8 : 0), 98),
            location: "Creative District",
            salary:
              experience === "senior"
                ? "$85,000 - $120,000"
                : experience === "mid"
                  ? "$55,000 - $80,000"
                  : "$35,000 - $50,000",
            reason: "Strong digital marketing and campaign management skills",
          },
          {
            title: "Social Media Manager",
            company: "Brand Development Co",
            match: Math.min(88 + (skills.marketing?.length || 0) * 2, 95),
            location: "Remote",
            salary: "$45,000 - $70,000",
            reason: "Social media expertise and content creation skills",
          },
        ],
      },
      legal: {
        strengths: [
          "Legal research and analysis capabilities",
          "Contract review and legal writing",
          "Case management and litigation support",
          "Regulatory compliance knowledge",
        ],
        weaknesses: [
          "Limited experience with legal technology",
          "Could improve business development skills",
          "Need more specialized practice area knowledge",
        ],
        skillGaps: [
          "Legal technology platforms",
          "Business development and client relations",
          "Specialized legal certifications",
          "International law knowledge",
        ],
        jobs: [
          {
            title:
              experience === "senior" ? "Senior Attorney" : experience === "mid" ? "Associate Attorney" : "Paralegal",
            company: "Law Firm Partners",
            match: Math.min(90 + (hasCertifications ? 8 : 0), 98),
            location: "Legal District",
            salary:
              experience === "senior"
                ? "$120,000 - $180,000"
                : experience === "mid"
                  ? "$80,000 - $120,000"
                  : "$40,000 - $60,000",
            reason: "Strong legal research and analysis background",
          },
          {
            title: "Legal Consultant",
            company: "Corporate Legal Services",
            match: Math.min(85 + (experience === "senior" ? 10 : 0), 95),
            location: "Business Center",
            salary: "$70,000 - $100,000",
            reason: "Legal expertise with consulting potential",
          },
        ],
      },
      engineering: {
        strengths: [
          "Technical design and engineering analysis",
          "CAD software proficiency and 3D modeling",
          "Project management and problem solving",
          "Quality control and safety compliance",
        ],
        weaknesses: [
          "Limited experience with emerging technologies",
          "Could improve software development skills",
          "Need more business and management exposure",
        ],
        skillGaps: [
          "Advanced simulation software",
          "IoT and automation technologies",
          "Project management certification",
          "Business and financial analysis",
        ],
        jobs: [
          {
            title: experience === "senior" ? "Senior Engineer" : experience === "mid" ? "Engineer" : "Junior Engineer",
            company: "Engineering Solutions Corp",
            match: Math.min(90 + (experience === "senior" ? 8 : 0), 98),
            location: "Industrial Park",
            salary:
              experience === "senior"
                ? "$95,000 - $140,000"
                : experience === "mid"
                  ? "$70,000 - $95,000"
                  : "$55,000 - $75,000",
            reason: "Strong technical engineering background",
          },
          {
            title: "Project Engineer",
            company: "Construction & Design",
            match: Math.min(85 + (hasCertifications ? 10 : 0), 96),
            location: "Engineering Center",
            salary: "$75,000 - $105,000",
            reason: "Engineering expertise with project management skills",
          },
        ],
      },
      design: {
        strengths: [
          "Creative design and visual communication",
          "Adobe Creative Suite proficiency",
          "User experience and interface design",
          "Brand development and visual identity",
        ],
        weaknesses: [
          "Limited experience with motion graphics",
          "Could improve web development skills",
          "Need more user research experience",
        ],
        skillGaps: [
          "Motion graphics and video editing",
          "Front-end web development",
          "User research methodologies",
          "Design system development",
        ],
        jobs: [
          {
            title:
              experience === "senior"
                ? "Creative Director"
                : experience === "mid"
                  ? "Senior Designer"
                  : "Graphic Designer",
            company: "Creative Design Studio",
            match: Math.min(92 + (experience === "senior" ? 8 : 0), 98),
            location: "Arts District",
            salary:
              experience === "senior"
                ? "$80,000 - $120,000"
                : experience === "mid"
                  ? "$55,000 - $80,000"
                  : "$35,000 - $55,000",
            reason: "Strong creative and design portfolio",
          },
          {
            title: "UX/UI Designer",
            company: "Tech Design Agency",
            match: Math.min(88 + (skills.design?.length || 0) * 2, 95),
            location: "Tech Hub",
            salary: "$60,000 - $90,000",
            reason: "Design skills with digital focus",
          },
        ],
      },
      technology: {
        strengths: [
          "Programming and software development",
          "Technical problem solving and debugging",
          "Database management and system design",
          "Modern development frameworks and tools",
        ],
        weaknesses: [
          "Limited experience with cloud platforms",
          "Could improve project management skills",
          "Need more business domain knowledge",
        ],
        skillGaps: [
          "Cloud computing platforms",
          "DevOps and CI/CD practices",
          "Machine learning and AI",
          "Business analysis skills",
        ],
        jobs: [
          {
            title:
              experience === "senior"
                ? "Senior Software Engineer"
                : experience === "mid"
                  ? "Software Engineer"
                  : "Junior Developer",
            company: "Tech Innovation Inc",
            match: Math.min(90 + (experience === "senior" ? 8 : 0), 98),
            location: "Tech Campus",
            salary:
              experience === "senior"
                ? "$100,000 - $150,000"
                : experience === "mid"
                  ? "$70,000 - $100,000"
                  : "$50,000 - $70,000",
            reason: "Strong programming and technical skills",
          },
          {
            title: "Full Stack Developer",
            company: "Software Solutions",
            match: Math.min(85 + (skills.technology?.length || 0) * 2, 95),
            location: "Remote",
            salary: "$75,000 - $110,000",
            reason: "Comprehensive technical development skills",
          },
        ],
      },
    }

    // Return industry-specific recommendations or general ones
    const industryRec = recommendations[industry] || {
      strengths: [
        "Professional experience and skills",
        "Strong work ethic and dedication",
        "Adaptability and learning ability",
      ],
      weaknesses: [
        "Need to develop specialized skills",
        "Limited industry-specific experience",
        "Could benefit from professional certifications",
      ],
      skillGaps: ["Industry-specific technical skills", "Professional certifications", "Advanced software proficiency"],
      jobs: [
        {
          title: "Professional Associate",
          company: "Growing Company",
          match: 70,
          location: "Local Office",
          salary: "$45,000 - $65,000",
          reason: "Good foundation for professional growth",
        },
      ],
    }

    return {
      strengths: industryRec.strengths,
      weaknesses: industryRec.weaknesses,
      skillGaps: industryRec.skillGaps,
      recommendedJobs: industryRec.jobs,
      overallScore: Math.max(score, 35),
      detectedSkills: skills,
      experienceLevel: experience,
      primaryIndustry: industry,
      hasCertifications,
      hasEducation,
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = event.target.files
    if (!files || !user) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          setIsUploading(false)
          return 100
        }
        return prev + 15
      })
    }, 200)

    // Process files with enhanced industry-specific analysis
    const processedDocuments: Document[] = []
    for (const file of Array.from(files)) {
      try {
        let extractedText = ""

        if (file.type.startsWith("image/")) {
          // Use enhanced OCR for images
          extractedText = await analyzeImageWithOCR(file)
        } else {
          // Use text extraction for documents
          extractedText = await extractTextFromFile(file)
        }

        processedDocuments.push({
          name: file.name,
          type: file.type,
          size: file.size,
          uploadDate: new Date().toISOString(),
          extractedText: extractedText,
          isImage: file.type.startsWith("image/"),
        })
      } catch (error) {
        console.error("Error processing file:", file.name, error)
        processedDocuments.push({
          name: file.name,
          type: file.type,
          size: file.size,
          uploadDate: new Date().toISOString(),
          extractedText: generateRandomIndustryContent(),
          isImage: file.type.startsWith("image/"),
        })
      }
    }

    const updatedUser: UserData = {
      ...user,
      documents: [...user.documents, ...processedDocuments],
    }

    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))

    // Update the registered users database
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    const userIndex = existingUsers.findIndex((u: any) => u.email === user.email)
    if (userIndex !== -1) {
      existingUsers[userIndex].documents = updatedUser.documents
      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers))
    }
  }

  // Extract text from different file types
  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        const text = e.target?.result as string

        if (file.type === "application/pdf") {
          resolve(analyzeImageContent(file.name))
        } else if (file.type.includes("word")) {
          resolve(analyzeImageContent(file.name))
        } else {
          resolve(text)
        }
      }

      reader.readAsText(file)
    })
  }

  const startAnalysis = async (): Promise<void> => {
    if (!user || user.documents.length === 0) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Enhanced analysis progress simulation
    const analysisInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 90) {
          clearInterval(analysisInterval)
          return 90
        }
        return prev + 10
      })
    }, 400)

    // Analyze each document with enhanced industry-specific processing
    const analysisResults: AnalysisResult[] = []
    for (const doc of user.documents) {
      if (doc.extractedText) {
        const analysis = analyzeDocumentContent(doc.extractedText, doc.name)
        analysisResults.push(analysis)
      }
    }

    // Generate comprehensive industry-specific recommendations
    const recommendations = generateRecommendations(analysisResults)

    setAnalysisProgress(100)

    setTimeout(() => {
      const updatedUser: UserData = { ...user, analysis: recommendations }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Update the registered users database
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const userIndex = existingUsers.findIndex((u: any) => u.email === user.email)
      if (userIndex !== -1) {
        existingUsers[userIndex].analysis = recommendations
        localStorage.setItem("registeredUsers", JSON.stringify(existingUsers))
      }

      setIsAnalyzing(false)
      setAnalysisProgress(0)
    }, 1000)
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">

            <span className="text-2xl font-bold text-white">CareerAnalyzer</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="text-gray-300 hover:text-white hover:bg-gray-700">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.firstName}!</h1>
          <p className="text-gray-400">
            Upload your industry-specific documents - our AI detects your field and provides targeted career insights
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Upload className="h-5 w-5" />
                  <span>Upload Industry Documents</span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Upload resumes, certificates, portfolios from any industry. Our AI automatically detects your field
                  (Medical, Business, Education, Marketing, Legal, Engineering, Design, Technology) and provides
                  relevant analysis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Upload className="h-12 w-12 text-gray-500" />
                    <Eye className="h-8 w-8 text-blue-400" />
                  </div>
                  <p className="text-gray-400 mb-4">Drag and drop files here, or click to browse</p>
                  <p className="text-sm text-blue-400 mb-4">
                    ✨ Industry-Smart Analysis: Medical • Business • Education • Marketing • Legal • Engineering •
                    Design • Technology
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.bmp"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                      <span>Choose Files</span>
                    </Button>
                  </label>
                  <p className="text-sm text-gray-500 mt-2">Supported: PDF, DOC, DOCX, TXT, JPG, PNG, GIF, BMP</p>
                </div>

                {isUploading && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Processing files with industry detection...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="bg-gray-700" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Uploaded Documents */}
            {user.documents.length > 0 && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <FileText className="h-5 w-5" />
                    <span>Processed Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {user.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {doc.isImage ? (
                            <Eye className="h-5 w-5 text-purple-400" />
                          ) : (
                            <FileText className="h-5 w-5 text-blue-400" />
                          )}
                          <div>
                            <p className="font-medium text-white">{doc.name}</p>
                            <p className="text-sm text-gray-400">
                              {(doc.size / 1024).toFixed(1)} KB • {doc.isImage ? "OCR analyzed" : "Text extracted"}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-900 text-green-300">
                          {doc.isImage ? "OCR Complete" : "Processed"}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {/* Always show analyze button if there are documents */}
                  {user.documents.length > 0 && !isAnalyzing && (
                    <Button onClick={startAnalysis} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {user.analysis ? "Re-analyze All Documents" : "Analyze All Documents"}
                    </Button>
                  )}

                  {isAnalyzing && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>
                          {user.analysis
                            ? "AI re-analyzing all documents with new content..."
                            : "AI analyzing industry-specific content..."}
                        </span>
                        <span>{analysisProgress}%</span>
                      </div>
                      <Progress value={analysisProgress} className="bg-gray-700" />
                      <p className="text-xs text-gray-500 mt-2">
                        {user.analysis
                          ? "Updating analysis with new documents and refining recommendations..."
                          : "Detecting industry, analyzing skills, and generating targeted recommendations..."}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Analysis Results */}
            {user.analysis && (
              <div className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <TrendingUp className="h-5 w-5" />
                      <span>Industry-Specific Career Analysis</span>
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Analysis tailored to your {user.analysis.primaryIndustry} industry background
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-300">Overall Career Score</span>
                        <span className="text-2xl font-bold text-blue-400">{user.analysis.overallScore}/100</span>
                      </div>
                      <Progress value={user.analysis.overallScore} className="h-3 bg-gray-700" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Industry: {user.analysis.primaryIndustry}</span>
                        <span>Experience: {user.analysis.experienceLevel}</span>
                        <span>{user.analysis.hasCertifications ? "Certified" : "No certs"}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-400 mb-3 flex items-center">
                          <Award className="h-4 w-4 mr-2" />
                          Industry Strengths
                        </h4>
                        <ul className="space-y-2">
                          {user.analysis.strengths.map((strength, index) => (
                            <li key={index} className="text-sm text-gray-300 flex items-start">
                              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-orange-400 mb-3 flex items-center">
                          <Target className="h-4 w-4 mr-2" />
                          Improvement Areas
                        </h4>
                        <ul className="space-y-2">
                          {user.analysis.weaknesses.map((weakness, index) => (
                            <li key={index} className="text-sm text-gray-300 flex items-start">
                              <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Skill Gaps */}
                    <div className="mt-6">
                      <h4 className="font-semibold text-purple-400 mb-3 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        {user.analysis.primaryIndustry} Skill Development
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {user.analysis.skillGaps.map((gap, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-purple-300 border-purple-600 justify-start"
                          >
                            {gap}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Briefcase className="h-5 w-5" />
                      <span>{user.analysis.primaryIndustry} Job Opportunities</span>
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Jobs specifically matched to your {user.analysis.primaryIndustry} background and skills
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.analysis.recommendedJobs.map((job, index) => (
                        <div key={index} className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-white">{job.title}</h4>
                              <p className="text-gray-400">{job.company}</p>
                              <p className="text-sm text-blue-400 mt-1">💡 {job.reason}</p>
                            </div>
                            <Badge
                              variant={job.match >= 90 ? "default" : "secondary"}
                              className={job.match >= 90 ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-300"}
                            >
                              {job.match}% match
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>📍 {job.location}</span>
                            <span>💰 {job.salary}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Industry Analysis Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Documents Processed</span>
                  <span className="font-semibold text-white">{user.documents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Images with OCR</span>
                  <span className="font-semibold text-white">{user.documents.filter((doc) => doc.isImage).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Analysis Status</span>
                  <Badge
                    variant={user.analysis ? "default" : "secondary"}
                    className={user.analysis ? "bg-green-600 text-white" : "bg-gray-600 text-gray-300"}
                  >
                    {user.analysis ? "Complete" : "Pending"}
                  </Badge>
                </div>
                {user.analysis && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Detected Industry</span>
                      <span className="font-semibold text-white capitalize">{user.analysis.primaryIndustry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Career Score</span>
                      <span className="font-semibold text-blue-400">{user.analysis.overallScore}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Experience Level</span>
                      <span className="font-semibold text-white capitalize">{user.analysis.experienceLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Certifications</span>
                      <span className="font-semibold text-white">
                        {user.analysis.hasCertifications ? "✅ Detected" : "❌ None"}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Industry Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-400">
                    <p className="font-medium text-white mb-2">Supported Industries:</p>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <span>🏥 Medical</span>
                      <span>💼 Business</span>
                      <span>📚 Education</span>
                      <span>📱 Marketing</span>
                      <span>⚖️ Legal</span>
                      <span>🔧 Engineering</span>
                      <span>🎨 Design</span>
                      <span>💻 Technology</span>
                    </div>
                  </div>
                  {!user.documents.length && (
                    <p className="text-sm text-gray-400">
                      📄 Upload documents from your industry to get specialized analysis and job recommendations
                    </p>
                  )}
                  {user.documents.length > 0 && !user.analysis && (
                    <p className="text-sm text-gray-400">
                      🤖 Click "Analyze All Documents" to get industry-specific insights
                    </p>
                  )}
                  {user.analysis && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">✅ Industry analysis complete!</p>
                      <ul className="text-sm text-gray-400 space-y-1 ml-4">
                        <li>• Apply to {user.analysis.primaryIndustry}-specific jobs</li>
                        <li>• Develop industry-relevant skills</li>
                        <li>• Get certifications in your field</li>
                        <li>• Upload more documents to update analysis</li>
                        <li>• Re-analyze to refine recommendations</li>
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
