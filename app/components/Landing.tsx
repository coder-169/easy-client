import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Send } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl font-bold mb-4">Decentralized Banking Made Simple</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Secure, transparent, and instant transactions with blockchain technology. Manage your crypto finances with ease.
        </p>
        <Button className="mt-6 px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700">Get Started</Button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card>
          <CardContent className="p-6 text-center">
            <ShieldCheck className="text-blue-500 mx-auto mb-4" size={40} />
            <h3 className="text-xl font-semibold">Secure Transactions</h3>
            <p className="text-gray-400">Your funds are protected with blockchain encryption.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Send className="text-blue-500 mx-auto mb-4" size={40} />
            <h3 className="text-xl font-semibold">Instant Transfers</h3>
            <p className="text-gray-400">Send and receive money globally without delays.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="text-blue-500 mx-auto mb-4" size={40} />
            <h3 className="text-xl font-semibold">No Hidden Fees</h3>
            <p className="text-gray-400">Transparent pricing with no unnecessary charges.</p>
          </CardContent>
        </Card>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6">
          Open an account, generate your blockchain address, and start transacting instantly.
        </p>
        <Button className="px-6 py-3 text-lg bg-green-600 hover:bg-green-700">Create an Account</Button>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          This Web3 banking app has changed the way I handle finances. Secure and super fast! - John D.
        </p>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience the Future of Banking?</h2>
        <Button className="px-6 py-3 text-lg bg-gray-900 hover:bg-gray-800">Sign Up Now</Button>
      </section>
    </div>
  );
}
