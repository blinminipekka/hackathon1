"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, BarChart3, Target, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <title>Career Analyzer</title>
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
       
            <span className="text-2xl font-bold text-white">CareerAnalyzer</span>
          </div>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Unlock Your Career Potential</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Upload your resume, certificates, and documents. Get AI-powered analysis of your strengths, weaknesses, and
          personalized job recommendations to accelerate your career growth.
        </p>
        <div className="space-x-4">
          <Link href="/signup">
            <Button size="lg" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white">
              Get Started Free
            </Button>
          </Link>
          <Link href="/demo">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 border-gray-600 text-black-300 hover:bg-gray-800 hover:text-white"
            >
              View Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardHeader>
              <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-white">Upload Documents</CardTitle>
              <CardDescription className="text-gray-300">
                Upload your resume, certificates, portfolios, and any career-related documents
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <CardTitle className="text-white">AI Analysis</CardTitle>
              <CardDescription className="text-gray-300">
                Our AI analyzes your documents to identify strengths, weaknesses, and skill gaps
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardHeader>
              <Target className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <CardTitle className="text-white">Job Recommendations</CardTitle>
              <CardDescription className="text-gray-300">
                Get personalized job recommendations and career advice based on your profile
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose CareerAnalyzer?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2 text-white">Trusted by 10k+ Users</h3>
              <p className="text-gray-400 text-sm">Join thousands of professionals who've advanced their careers</p>
            </div>

            <div className="text-center">
              <div className="bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="font-semibold mb-2 text-white">95% Accuracy</h3>
              <p className="text-gray-400 text-sm">Highly accurate AI analysis powered by latest technology</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2 text-white">Personalized Results</h3>
              <p className="text-gray-400 text-sm">Tailored recommendations based on your unique profile</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-orange-400" />
              </div>
              <h3 className="font-semibold mb-2 text-white">Secure & Private</h3>
              <p className="text-gray-400 text-sm">Your documents are encrypted and never shared</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BarChart3 className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold">CareerAnalyzer</span>
          </div>
          <p className="text-gray-400">© 2025 CareerAnalyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
