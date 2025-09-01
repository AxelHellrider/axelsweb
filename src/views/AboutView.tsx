import ViewShell from "./ViewsShell";
import React from "react";

export default function AboutView({onBack}) {
    return (
        <ViewShell onBack={onBack}>
            <div className="text-white flex md:flex-row md:gap-[20%] md:items-start md:justify-between">
                {/*<button*/}
                {/*    onClick={onBack}*/}
                {/*    className="px-3 py-1 rounded bg-blue-400/30 hover:bg-blue-700/30 transition about-me-btn"*/}
                {/*>*/}
                {/*    ← Back*/}
                {/*</button>*/}
                <div className="flex flex-col gap-5 px-6 py-3 relative w-[40%]">
                    <div className="flex flex-col items-start justify-between">
                        <h2 className="text-lg font-semibold mb-1">Alexandros Nomikos</h2>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="rounded-xl ring-2 ring-[#006cbd]/80 overflow-hidden" width={"200"} height={"200"} src="/about/linkedin-profpic.jpg" alt="profile picture"/>
                        <p className="text-sm text-gray-200/90">
                            Web Developer/Creative Coder
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-between text-sm">
                        <h2 className="text-xl font-semibold mb-1">Skills</h2>
                        <span>Next.js</span>
                        <span>React</span>
                        <span>Vue3</span>
                        <span>AngularJS</span>
                        <span>Three.js</span>
                        <span>jQuery</span>

                        <span>Sass</span>
                        <span>Bootstrap</span>
                        <span>TailwindCSS</span>

                        <span>PHP</span>
                        <span>Phalcon</span>
                        <span>Node.js</span>
                        <span>Express.js</span>
                        <span>Python</span>
                        <span>Django</span>
                        <span>Flask</span>

                        <span>Git</span>
                        <span>Docker</span>

                        <span>Jira</span>
                        <span>Bitbucket</span>

                        <span>Wordpress</span>
                    </div>
                </div>

                <div className="rounded-xl p-6 bg-white/5 backdrop-blur-md ring-1 ring-white/10 w-[40%]">

                    <h2 className="text-xl font-semibold mb-3">About me</h2>
                    <div>
                        <p className="text-sm text-gray-200/90">
                            Small bio, skills, and a few highlights. Replace with your content.
                        </p>
                    </div>
                </div>
            </div>

        </ViewShell>
    );
}
