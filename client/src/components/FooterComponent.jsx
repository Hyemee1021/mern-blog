import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsGithub, BsLinkedin } from "react-icons/bs";
export const FooterComponent = () => {
  return (
    <Footer container className="border border-t-4 border-orange-400">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex  gap-5 flex-col w-full justify-around  md:flex-row">
          <div className="mt-5">
            {/* logo */}
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-3 py-1  rounded-full text-white   drop-shadow bg-gradient-to-r from-pink-500 via-yello-500 to-orange-500">
                HyeMee
              </span>
              's Blog
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener norefererr">
                  My project1
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener norefererr">
                  My project2
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow me" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Term &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="" target="_blank" rel="noopener norefererr">
                  My project1
                </Footer.Link>
                <Footer.Link href="" target="_blank" rel="noopener norefererr">
                  My project2
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full flex flex-col  items-center  md:justify-around md:flex-row">
          <Footer.Copyright
            href="#"
            by="Hyemee's blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-2 mt-4 sm:justify-center">
            <Footer.Icon icon={BsGithub} />
            <Footer.Icon icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  );
};
