import "@cyntler/react-doc-viewer/dist/index.css";
import {
  Download,
  FilePlus,
  FileUp,
  ImageIcon,
  Upload,
  X,
  CircleArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldInput from "@/components/basic/FormFieldInput";
import { Helmet, HelmetProvider } from "react-helmet-async";
import PDFViewerContainer from "@/components/pageComponent/PDFViewer/container/PDFViewerContainer";

const EditPDF = ({
  pdfDoc,
  pdfDataUrl,
  isLoading,
  insertImageFile,
  pdfInputRef,
  addImageInputRef,
  navigate,
  handleFileUpload,
  addUploadedImage,
  handleInsertImage,
  insertUploadedImage,
  removePage,
  downloadPDF,
  rotatePage,
  removeSelectedInsertFile,
  triggerPdfUpload,
  triggerAddImageUpload,
  handleDragStart,
  handleDragEnd,
  handleDropPage,
}) => {
  const insertUploadedImageForm = useForm({
    defaultValues: {
      insertImageFile: null,
      pageIndex: "",
    },
  });
  return (
    <div className="flex flex-col gap-6">
      <HelmetProvider>
        <Helmet>
          <title>Edit PDF</title>
          <meta charset="UTF-8" />
          <meta name="description" content="This is a edit pdf page" />
        </Helmet>
      </HelmetProvider>

      <div className="container mx-auto pt-8 px-4 z-10">
        <Button
          className="flex gap-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <CircleArrowLeft />
          <p>Navigate back</p>
        </Button>
      </div>
      {/* Hidden file inputs */}
      <Input
        type="file"
        ref={pdfInputRef}
        accept="application/pdf"
        onChange={handleFileUpload}
        className="hidden"
      />
      <Input
        type="file"
        ref={addImageInputRef}
        accept="image/jpeg,image/png"
        onChange={addUploadedImage}
        className="hidden"
      />

      {/* Upload section */}
      {!pdfDoc && (
        <div className="flex justify-center items-center h-screen -mt-20">
          <div
            className="p-10 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer transition-colors w-[50vw] max-w-xl rounded-2xl hover:border-violet-500"
            onClick={triggerPdfUpload}
          >
            <div className="bg-violet-100 dark:bg-violet-800 p-4 rounded-full mb-5">
              <Upload className="h-12 w-12 text-violet-600 dark:text-violet-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Upload a PDF
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-4 max-w-sm">
              Click or drag and drop your PDF file here to start editing or
              reviewing your document.
            </p>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                triggerPdfUpload();
              }}
              className="mt-2"
            >
              <FileUp className="mr-2 h-4 w-4" /> Select PDF
            </Button>

            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center space-y-1">
              <p>📄 Only PDF files are supported</p>
              <p>📦 Max file size: 20MB</p>
              <p>🔐 Your files are processed securely</p>
            </div>
          </div>
        </div>
      )}

      {/* PDF Editor UI */}
      {pdfDoc && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar with controls */}
          <Card className="lg:col-span-3 p-4 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">PDF Editor</h2>

            <div className="flex flex-col gap-2">
              <Button
                onClick={triggerPdfUpload}
                variant="outline"
                className="w-full justify-start"
              >
                <FileUp className="mr-2 h-4 w-4" /> Change PDF
              </Button>

              <Button
                onClick={triggerAddImageUpload}
                variant="outline"
                className="w-full justify-start"
              >
                <ImageIcon className="mr-2 h-4 w-4" /> Add Image
              </Button>

              <Button onClick={downloadPDF} className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>

              <Form {...insertUploadedImageForm}>
                <form
                  onSubmit={insertUploadedImageForm.handleSubmit((data) =>
                    insertUploadedImage(data).then(() => {
                      insertUploadedImageForm.reset();
                      removeSelectedInsertFile();
                    })
                  )}
                  className="space-y-4 p-6 border rounded-xl shadow-sm"
                >
                  <div className="flex flex-col space-y-2">
                    {/* Hidden file input */}
                    <FormFieldInput
                      form={insertUploadedImageForm}
                      id="insert-image-file"
                      name="insertImageFile"
                      label="Insert Image At..."
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleInsertImage}
                      className="hidden"
                      required
                    />

                    {/* Custom file upload area */}
                    {!insertImageFile ? (
                      <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors">
                        <label
                          htmlFor="insert-image-file"
                          className="cursor-pointer"
                        >
                          <div className="flex flex-col items-center justify-center gap-2">
                            <div className="p-3 rounded-full">
                              <ImageIcon className="h-6 w-6 text-violet-500" />
                            </div>
                            <p className="font-medium text-gray-700 dark:text-gray-200">
                              Click to browse or drag image here
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              JPG or PNG only
                            </p>
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className=" border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-md">
                              <ImageIcon className="h-5 w-5 text-violet-600" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs text-gray-800 dark:text-gray-200 max-w-20 sm:max-w-60 lg:max-w-28 truncate">
                                {insertImageFile.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-200">
                                {insertImageFile.type}
                                <br /> ·{" "}
                                {(insertImageFile.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeSelectedInsertFile}
                            className="p-1 rounded-full hover:bg-violet-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <FormFieldInput
                      form={insertUploadedImageForm}
                      label={"Page Index"}
                      name={"pageIndex"}
                      placeholder={"e.g. 2"}
                      type="number"
                      className="focus:ring-2 focus:ring-violet-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-violet-600 hover:bg-violet-700 transition-colors"
                  >
                    <FilePlus className="mr-2 h-4 w-4" /> Insert Page
                  </Button>
                </form>
              </Form>
            </div>
          </Card>

          {/* PDF Viewer */}
          <div className="lg:col-span-9 rounded-lg shadow-sm overflow-hidden">
            <ScrollArea className="h-screen">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-200">
                      Processing PDF...
                    </p>
                  </div>
                </div>
              ) : pdfDataUrl ? (
                <PDFViewerContainer
                  fileUrl={pdfDataUrl}
                  rotatePage={rotatePage}
                  removePage={removePage}
                  handleDragStart={handleDragStart}
                  handleDragEnd={handleDragEnd}
                  handleDropPage={handleDropPage}
                />
              ) : (
                <div className="flex justify-center items-center h-64 text-gray-500">
                  <p>No PDF loaded. Please upload a PDF file.</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPDF;
