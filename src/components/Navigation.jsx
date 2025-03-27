import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Globe } from "lucide-react";
import { Link } from "react-router";

function Navigation() {
  const { user } = useUser();

  return (
    <nav className="z-10 bg-black flex items-center justify-between px-6 md:px-12 text-white py-4 shadow-lg">
      <div className="flex items-center space-x-6 md:space-x-10">
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-300 transition">
          Horizone
        </Link>
        <div className="hidden md:flex space-x-6 text-lg">
          <Link to={`/`} className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link to={`/hotels`} className="hover:text-gray-300 transition">
            All Hotels
          </Link>
          {user?.publicMetadata?.role === "admin" && (
            <Link to={`/hotels/create`} className="hover:text-gray-300 transition">
              Create Hotel
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-6">
      <Button variant="ghost" className="">
          <Globe className="h-5 w-5 mr-2" />
          EN
        </Button>
        <SignedOut>
          <Button variant="ghost" asChild className="hover:bg-gray-800 px-4 py-2 rounded-lg">
            <Link to="/sign-in">Log In</Link>
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium">
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <Button asChild className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium">
            <Link to="/account">My Account</Link>
          </Button>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navigation;
