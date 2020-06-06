//#include <opencv2/imgproc.hpp>
//#include <opencv2/highgui.hpp>
//#include <opencv2/dnn.hpp>
//
//using namespace cv;
//using namespace cv::dnn;
//
//const char* keys =
//        "{ help  h     | | Print help message. }"
//        "{ input i     | | Path to input image or video file. Skip this argument to capture frames from a camera.}"
//        "{ model m     | | Path to a binary .pb file contains trained network.}"
//        "{ width       | 320 | Preprocess input image by resizing to a specific width. It should be multiple by 32. }"
//        "{ height      | 320 | Preprocess input image by resizing to a specific height. It should be multiple by 32. }"
//        "{ thr         | 0.5 | Confidence threshold. }"
//        "{ nms         | 0.4 | Non-maximum suppression threshold. }";
//
// Example: -i=waltonhouse.png -m=frozen_east_text_detection.pb -width=1216 -height=800 -thr=0.5 -nms=0.69
//
//void decode(const Mat& scores, const Mat& geometry, float scoreThresh,
//            std::vector<RotatedRect>& detections, std::vector<float>& confidences);
//
//int main(int argc, char** argv)
//{
//    // Parse command line arguments.
//    CommandLineParser parser(argc, argv, keys);
//    parser.about("Use this script to run TensorFlow implementation (https://github.com/argman/EAST) of "
//                 "EAST: An Efficient and Accurate Scene Text Detector (https://arxiv.org/abs/1704.03155v2)");
//    if (argc == 1 || parser.has("help"))
//    {
//        parser.printMessage();
//        return 0;
//    }
//
//    float confThreshold = parser.get<float>("thr");
//    float nmsThreshold = parser.get<float>("nms");
//    int inpWidth = parser.get<int>("width");
//    int inpHeight = parser.get<int>("height");
//    String model = parser.get<String>("model");
//
//    if (!parser.check())
//    {
//        parser.printErrors();
//        return 1;
//    }
//
//    CV_Assert(!model.empty());
//
//    // Load network.
//    Net net = readNet(model);
//
//    // Open a video file or an image file or a camera stream.
//
//    static const std::string kWinName = "EAST: An Efficient and Accurate Scene Text Detector";
//    namedWindow(kWinName, WINDOW_NORMAL);
//
//    std::vector<Mat> outs;
//    std::vector<String> outNames(2);
//    outNames[0] = "feature_fusion/Conv_7/Sigmoid";
//    outNames[1] = "feature_fusion/concat_3";
//
//    Mat blob;
//        auto frame = imread( "visionhouse-apt5.png", IMREAD_COLOR );
//        blobFromImage(frame, blob, 1.0, Size(inpWidth, inpHeight), Scalar(123.68, 116.78, 103.94), true, false);
//        net.setInput(blob);
//        net.forward(outs, outNames);
//
//        Mat scores = outs[0];
//        Mat geometry = outs[1];
//
//        // Decode predicted bounding boxes.
//        std::vector<RotatedRect> boxes;
//        std::vector<float> confidences;
//        decode(scores, geometry, confThreshold, boxes, confidences);
//
//        // Apply non-maximum suppression procedure.
//        std::vector<int> indices;
//        NMSBoxes(boxes, confidences, confThreshold, nmsThreshold, indices);
//
//        // Render detections.
//        Point2f ratio((float)frame.cols / inpWidth, (float)frame.rows / inpHeight);
//        for (size_t i = 0; i < indices.size(); ++i)
//        {
//            RotatedRect& box = boxes[indices[i]];
//
//            Point2f vertices[4];
//            box.points(vertices);
//            for (int j = 0; j < 4; ++j)
//            {
//                vertices[j].x *= ratio.x;
//                vertices[j].y *= ratio.y;
//            }
//            for (int j = 0; j < 4; ++j)
//                line(frame, vertices[j], vertices[(j + 1) % 4], Scalar(0, 255, 0), 1);
//        }
//
//        // Put efficiency information.
//        std::vector<double> layersTimes;
//        double freq = getTickFrequency() / 1000;
//        double t = net.getPerfProfile(layersTimes) / freq;
//        std::string label = format("Inference time: %.2f ms", t);
//        putText(frame, label, Point(0, 15), FONT_HERSHEY_SIMPLEX, 0.5, Scalar(0, 255, 0));
//
//        imshow(kWinName, frame);
//
//    while (waitKey(1) < 0) {
//    }
//    return 0;
//}
//
//void decode(const Mat& scores, const Mat& geometry, float scoreThresh,
//            std::vector<RotatedRect>& detections, std::vector<float>& confidences)
//{
//    detections.clear();
//    CV_Assert(scores.dims == 4); CV_Assert(geometry.dims == 4); CV_Assert(scores.size[0] == 1);
//    CV_Assert(geometry.size[0] == 1); CV_Assert(scores.size[1] == 1); CV_Assert(geometry.size[1] == 5);
//    CV_Assert(scores.size[2] == geometry.size[2]); CV_Assert(scores.size[3] == geometry.size[3]);
//
//    const int height = scores.size[2];
//    const int width = scores.size[3];
//    for (int y = 0; y < height; ++y)
//    {
//        const float* scoresData = scores.ptr<float>(0, 0, y);
//        const float* x0_data = geometry.ptr<float>(0, 0, y);
//        const float* x1_data = geometry.ptr<float>(0, 1, y);
//        const float* x2_data = geometry.ptr<float>(0, 2, y);
//        const float* x3_data = geometry.ptr<float>(0, 3, y);
//        const float* anglesData = geometry.ptr<float>(0, 4, y);
//        for (int x = 0; x < width; ++x)
//        {
//            float score = scoresData[x];
//            if (score < scoreThresh)
//                continue;
//
//            // Decode a prediction.
//            // Multiple by 4 because feature maps are 4 time less than input image.
//            float offsetX = x * 4.0f, offsetY = y * 4.0f;
//            float angle = anglesData[x];
//            float cosA = std::cos(angle);
//            float sinA = std::sin(angle);
//            float h = x0_data[x] + x2_data[x];
//            float w = x1_data[x] + x3_data[x];
//
//            Point2f offset(offsetX + cosA * x1_data[x] + sinA * x2_data[x],
//                           offsetY - sinA * x1_data[x] + cosA * x2_data[x]);
//            Point2f p1 = Point2f(-sinA * h, -cosA * h) + offset;
//            Point2f p3 = Point2f(-cosA * w, sinA * w) + offset;
//            RotatedRect r(0.5f * (p1 + p3), Size2f(w, h), -angle * 180.0f / (float)CV_PI);
//            detections.push_back(r);
//            confidences.push_back(score);
//        }
//    }
//}




//#include "opencv2/imgcodecs.hpp"
//#include "opencv2/highgui.hpp"
//#include "opencv2/imgproc.hpp"
//#include <iostream>
//
//using namespace std;
//using namespace cv;
//bool use_mask;
//Mat img;
//Mat templ;
//Mat mask;
//Mat result;
//const char *image_window = "Source Image";
//const char *result_window = "Result window";
//int match_method = 5;
//int max_Trackbar = 5;
//void MatchingMethod( int, void * );
//
//int main( int argc, char **argv ) {
//    if ( argc < 4 ) {
//        cout << "Not enough parameters" << endl;
//        cout << "Usage:\n" << argv[0] << " <image_name> <template_name> [<mask_name>]" << endl;
//        return -1;
//    }
//    img = imread( argv[2], IMREAD_COLOR );
//    templ = imread( argv[3], IMREAD_COLOR );
//    if ( argc > 4 ) {
//        use_mask = true;
//        mask = imread( argv[3], IMREAD_COLOR );
//    }
//    if ( img.empty() || templ.empty() || ( use_mask && mask.empty())) {
//        cout << "Can't read one of the images" << endl;
//        return EXIT_FAILURE;
//    }
//    namedWindow( image_window, WINDOW_AUTOSIZE );
//    namedWindow( result_window, WINDOW_AUTOSIZE );
//    const char *trackbar_label = "Method: \n 0: SQDIFF \n 1: SQDIFF NORMED \n 2: TM CCORR \n 3: TM CCORR NORMED \n 4: TM COEFF \n 5: TM COEFF NORMED";
//    createTrackbar( trackbar_label, image_window, &match_method, max_Trackbar, MatchingMethod );
//    MatchingMethod( 5, 0 );
//    waitKey( 0 );
//    return EXIT_SUCCESS;
//}
//
//void MatchingMethod( int, void * ) {
//    Mat img_display;
//    img.copyTo( img_display );
//    int result_cols = img.cols - templ.cols + 1;
//    int result_rows = img.rows - templ.rows + 1;
//    result.create( result_rows, result_cols, CV_32FC1);
//    bool method_accepts_mask = ( TM_SQDIFF == match_method || match_method == TM_CCORR_NORMED );
//    if ( use_mask && method_accepts_mask ) { matchTemplate( img, templ, result, match_method, mask ); }
//    else { matchTemplate( img, templ, result, match_method ); }
//    normalize( result, result, 0, 1, NORM_MINMAX, -1, Mat());
//
////    if ( match_method == TM_CCOEFF_NORMED ) {
//    for ( int yr = 0; yr < result_rows; yr++ ) {
//        for ( int xr = 0; xr < result_cols; xr++ ) {
//            auto res = result.at<float>( yr, xr );
//            if ( res > 0.95f ) {
//                std::cout << "LocalMax(" << xr << "," << yr << ")" << std::endl;
//                Point matchLoc{ xr, yr };
//                rectangle( img_display, matchLoc, Point( matchLoc.x + templ.cols, matchLoc.y + templ.rows ),
//                           Scalar::all( 0 ), 2, 8, 0 );
//                rectangle( result, matchLoc, Point( matchLoc.x + templ.cols, matchLoc.y + templ.rows ),
//                           Scalar::all( 0 ), 2, 8, 0 );
//            }
//        }
//    }
////    }
//
//
////    double minVal; double maxVal; Point minLoc; Point maxLoc;
////    Point matchLoc;
////    minMaxLoc( result, &minVal, &maxVal, &minLoc, &maxLoc, Mat() );
////    if( match_method  == TM_SQDIFF || match_method == TM_SQDIFF_NORMED )
////    { matchLoc = minLoc; }
////    else
////    { matchLoc = maxLoc; }
////    rectangle( img_display, matchLoc, Point( matchLoc.x + templ.cols , matchLoc.y + templ.rows ), Scalar::all(0), 2, 8, 0 );
////    rectangle( result, matchLoc, Point( matchLoc.x + templ.cols , matchLoc.y + templ.rows ), Scalar::all(0), 2, 8, 0 );
//    imshow( image_window, img_display );
//    imshow( result_window, result );
//    return;
//}


//#include "opencv2/imgcodecs.hpp"
//#include <iostream>
//#include <opencvutils/cvmatutil.hpp>
//
//using namespace std;
//using namespace cv;
//
//int main( int argc, char **argv ) {
//    if ( argc < 2 ) {
//        cout << "Not enough parameters" << endl;
//        cout << "Usage:\n" << argv[0] << " <image_name> " << endl;
//        return -1;
//    }
//    auto img = imread( argv[2], IMREAD_GRAYSCALE );
//    auto huMoments = huMomentsOnImageRaw( img );
//    LOGRS( huMoments[0] <<  ",  " << huMoments[1] <<  ",  " << huMoments[2] <<  ",  " << huMoments[3] <<  ",  " << huMoments[4] <<  ",  " << huMoments[5] <<  ",  " << huMoments[6] );
//
//    return EXIT_SUCCESS;
//}


#include "sources/house_maker_statemachine.h"
#include "sources/transition_table_fsm.hpp"

#include <graphics/opengl/gl_headers.hpp>
#include "render_scene_graph/event_horizon.h"

#ifndef ANDROID
int main( int argc, char *argv[] ) {

    EventHorizon<HouseMakerStateMachine> ev{ argc, argv };

    return 0;
}

#elif USE_GLFVR
#include "VrApi.h"
#include "VrApi_Helpers.h"
#include "VrApi_SystemUtils.h"
#include "VrApi_Input.h"

void glfvrMain() {
    EventHorizon<HouseMakerStateMachine> ev{ 1, NULL };
}

#else

#include <glfm/glfm.h>
#include <graphics/opengl/mobile/window_handling_opengl_glfm.hpp>


void glfmMain(GLFMDisplay *display) {
    glfmdisplay = display;
    EventHorizon<HouseMakerStateMachine> ev{ 1, NULL };
}

#endif