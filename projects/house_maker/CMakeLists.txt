cmake_minimum_required (VERSION 2.6)
include(../../event_horizon/native/CMakeLists.txt NO_POLICY_SCOPE)
project(house_maker)

set(BUILD_FROM_SOURCE TRUE)
set(_USE_IMGUI_ TRUE)
compile( core lua graphics poly render_scene_graph opencvutils machine_learning ocr )

compile_submodule( "eh_arch/controller" )
compile_submodule( "eh_arch/models" )
compile_submodule( "eh_arch/render" )
compile_submodule( "eh_arch/makers" )
compile_local(sources)

add_executable(${PROJECT_NAME} ${BUILD_FILES})

linker(${PROJECT_NAME} "${LIBS}")

install (TARGETS ${PROJECT_NAME} DESTINATION /usr/local/bin )
