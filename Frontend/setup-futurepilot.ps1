Write-Host "🚀 Creating FuturePilot Database..."

$mongoScript = @"

use futurepilot

db.createCollection("users")
db.createCollection("assessments")
db.createCollection("careers")
db.createCollection("roadmaps")

db.careers.insertMany([

{
    name: "AI Engineer",
    category: "Technology",
    roadmap: [
        "Python Fundamentals",
        "Data Analysis",
        "Machine Learning",
        "Deep Learning",
        "AI Portfolio"
    ]
},

{
    name: "Cybersecurity Analyst",
    category: "Technology",
    roadmap: [
        "Networking",
        "Linux",
        "Security Fundamentals",
        "TryHackMe Labs",
        "Portfolio Project"
    ]
},

{
    name: "Doctor",
    category: "Health Sciences",
    roadmap: [
        "Biology",
        "Chemistry",
        "Anatomy",
        "Research",
        "Medical School Preparation"
    ]
},

{
    name: "Lawyer",
    category: "Law",
    roadmap: [
        "Critical Thinking",
        "Debate",
        "Legal Fundamentals",
        "Case Analysis",
        "Law School Preparation"
    ]
}

])

print("FuturePilot database created successfully!")

"@

$mongoScript | mongosh

Write-Host "✅ FuturePilot Ready!"