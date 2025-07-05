import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Download, Eye, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AI_PLATFORM_HEADING,
  LLM_PLATFORMS,
  UserRolesEnum,
} from "@/constants/constants";

function PDFPage({
  docs,
  theme,
  selectedNotes,
  handleDownload,
  userRole,
  isGenerating,
  generateSummaryAndExtractText,
}) {
  const notes = selectedNotes?.notes[0];

  return (
    <div className="mt-5">
      <HelmetProvider>
        <Helmet>
          <title>Pdf Notes</title>
          <meta charset="UTF-8" />
          <meta name="description" content="This is a pdf page" />
        </Helmet>
      </HelmetProvider>

      <div className="mb-8">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Smart Document Analyzer
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              View, analyze, and chat with your documents using AI-powered
              insights
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="text-xs">
              📄 PDF Viewer
            </Badge>
            <Badge variant="secondary" className="text-xs">
              🤖 AI Summary
            </Badge>
            <Badge variant="secondary" className="text-xs">
              💬 LLM Integration
            </Badge>
            <Badge variant="secondary" className="text-xs">
              📝 Text Extraction
            </Badge>
          </div>
        </div>

        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      </div>

      <Tabs defaultValue="pdf" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="pdf" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            PDF Viewer
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Text Content
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pdf" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Document Viewer
              </CardTitle>
              <CardDescription>
                View and interact with your PDF document
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <DocViewer
                documents={docs}
                pluginRenderers={DocViewerRenderers}
                theme={{
                  primary: "#5296d8",
                  secondary: "#ffffff",
                  tertiary: "#5296d899",
                  textPrimary: "#ffffff",
                  textSecondary: "#5296d8",
                  textTertiary: "#fff",
                  disableThemeScrollbar: false,
                }}
                config={{
                  pdfZoom: {
                    defaultZoom: 0.8,
                  },
                  pdfVerticalScrollByDefault: true,
                }}
                style={{
                  backgroundColor: `${
                    theme === "dark" ? "#313131" : "#FAF9F6"
                  }`,
                  minHeight: "600px",
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="mt-0">
          {notes?.summary ? (
            <>
              <div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Document Summary
                </div>
                <div className="mt-2">
                  AI-generated summary and key questions from the document
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">AI Generated</Badge>
                  <Badge variant="outline">Summary & Questions</Badge>
                </div>
              </div>

              <ScrollArea className="h-[600px] w-full rounded-md border p-4 mt-4">
                <div className="prose prose-sm max-w-none dark:prose-invert bg-white text-black p-5 rounded-md">
                  <MarkdownPreview
                    source={notes?.summary}
                    className="bg-white text-black prose"
                  />
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="h-[600px] w-full rounded-md border flex items-center justify-center">
              <div className="text-center space-y-4 max-w-md">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    No Summary Available
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    No AI-generated summary has been provided for this document
                    yet.
                  </p>
                </div>
                {userRole === UserRolesEnum.ADMIN && (
                  <div className="space-y-2">
                    <Button
                      disabled={isGenerating}
                      onClick={generateSummaryAndExtractText}
                    >
                      Generate Summary and Extract Text
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="text" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                AI Chat Integration
              </CardTitle>
              <CardDescription>
                Upload your text file to an LLM and start chatting with your
                document
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {notes?.textFile?.url ? (
                <>
                  {/* Available File Section */}
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-sm">
                        Available Text File
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        Ready to Upload
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-background rounded-md border">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {`${selectedNotes?.chapterName} Text File` ||
                            "notes-text.txt"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Extracted text content • Ready for AI analysis
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleDownload(
                              notes?.textFile?.url,
                              selectedNotes?.chapterName
                            )
                          }
                          className="flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* LLM Integration Options */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm">
                      {AI_PLATFORM_HEADING}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {LLM_PLATFORMS.map((platform, idx) => (
                        <Card
                          key={idx}
                          className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/50"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 bg-${platform.color}-100 dark:bg-${platform.color}-900/30 rounded-lg flex items-center justify-center`}
                              >
                                <div
                                  className={`w-4 h-4 bg-${platform.color}-600 rounded-sm`}
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">
                                  {platform.name}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  {platform.provider}
                                </p>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">
                              {platform.description}
                            </p>

                            <Button
                              size="sm"
                              className="w-full"
                              variant={platform.variant}
                              disabled={platform.isComingSoon}
                              onClick={() => {
                                if (platform.url) {
                                  window.open(platform.url, "_blank");
                                }
                              }}
                            >
                              {platform.buttonLabel}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Instructions Section */}
                  <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">
                          ?
                        </span>
                      </div>
                      <h4 className="font-medium text-sm">How to use</h4>
                    </div>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-primary mt-0.5">
                          1.
                        </span>
                        <span>
                          Download the text file or choose an AI platform above
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-primary mt-0.5">
                          2.
                        </span>
                        <span>Upload the file to your chosen LLM platform</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-primary mt-0.5">
                          3.
                        </span>
                        <span>
                          Start asking questions about your document content
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-primary mt-0.5">
                          4.
                        </span>
                        <span>
                          Use the summary tab for context and reference
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      💡 Tip: Use the summary for better context
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      🔍 Ask specific questions about the content
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      📝 Request explanations of complex topics
                    </Badge>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-6 py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      No Text File Available
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      No text file has been extracted from this document yet.
                      You'll need a text file to chat with AI platforms.
                    </p>
                  </div>

                  {userRole === UserRolesEnum.ADMIN && (
                    <div className="space-y-4 flex justify-center">
                      <Button
                        disabled={isGenerating}
                        onClick={generateSummaryAndExtractText}
                        className="flex items-center gap-2"
                      >
                        Generate Summary and Extract Text
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PDFPage;
